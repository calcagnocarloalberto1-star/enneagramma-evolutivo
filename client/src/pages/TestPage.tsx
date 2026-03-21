import { useState, useCallback } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { ArrowRight, ArrowLeft, CheckCircle2, TreePine } from "lucide-react";

interface FruitQuestions {
  nome: string;
  numero: number;
  enneatipo: number;
  domande: string[];
}

interface TestData {
  frutti: FruitQuestions[];
}

const fruitEmoji: Record<string, string> = {
  Mela: "🍎", Pera: "🍐", Ciliegia: "🍒", Nespola: "🫐",
  Uva: "🍇", Mirtillo: "🫐", Ananas: "🍍", Albicocca: "🍑", Fragola: "🍓",
};

const fruitOrder = ["Mela", "Pera", "Ciliegia", "Nespola", "Uva", "Mirtillo", "Ananas", "Albicocca", "Fragola"];

function generateVisitorId(): string {
  return 'v_' + Math.random().toString(36).substring(2, 15) + Date.now().toString(36);
}

export default function TestPage() {
  const [, navigate] = useLocation();
  const [phase, setPhase] = useState<"welcome" | "test" | "age" | "submitting">("welcome");
  const [currentFruitIndex, setCurrentFruitIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, boolean[]>>({});
  const [eta, setEta] = useState("");
  const [intro, setIntro] = useState("");

  const { data: testData, isLoading } = useQuery<TestData>({
    queryKey: ["/api/test/questions"],
  });

  // Sort fruits to match canonical order
  const sortedFruits = testData?.frutti
    ? fruitOrder.map(name => testData.frutti.find(f => f.nome === name)).filter(Boolean) as FruitQuestions[]
    : [];

  const totalQuestions = sortedFruits.length * 20;
  const answeredCount = Object.values(answers).reduce((sum, arr) => sum + arr.filter(a => a !== undefined).length, 0);
  const progressPercent = totalQuestions > 0 ? (answeredCount / totalQuestions) * 100 : 0;

  const currentFruit = sortedFruits[currentFruitIndex];
  const currentAnswers = currentFruit ? (answers[currentFruit.nome] || new Array(20).fill(undefined)) : [];

  // Use a ref-style approach: capture the fruit name at click time, not callback creation time
  const handleAnswer = useCallback((questionIndex: number, value: boolean) => {
    const fruitName = sortedFruits[currentFruitIndex]?.nome;
    if (!fruitName) return;
    setAnswers(prev => {
      const arr = prev[fruitName] ? [...prev[fruitName]] : new Array(20).fill(false) as boolean[];
      arr[questionIndex] = value;
      return { ...prev, [fruitName]: arr };
    });
  }, [sortedFruits, currentFruitIndex]);

  const isCurrentFruitComplete = currentAnswers.every(a => a === true || a === false);

  // Check if ALL 9 fruits have all 20 questions answered
  // Use explicit true/false check, not just !== undefined, to avoid edge cases
  const isTestComplete = sortedFruits.length === 9 && sortedFruits.every(fruit => {
    const arr = answers[fruit.nome];
    return arr && arr.length >= 20 && arr.slice(0, 20).every(a => a === true || a === false);
  });

  const submitMutation = useMutation({
    mutationFn: async (payload: any) => {
      const res = await apiRequest("POST", "/api/test/submit", payload);
      return res.json();
    },
    onSuccess: (data) => {
      navigate(`/test/results/${data.id}`);
    },
  });

  const handleSubmit = () => {
    if (!eta || parseInt(eta) < 1) return;
    
    // Convert answers to boolean arrays (undefined -> false)
    const cleanAnswers: Record<string, boolean[]> = {};
    for (const [fruit, arr] of Object.entries(answers)) {
      cleanAnswers[fruit] = arr.map(a => a === true);
    }
    
    setPhase("submitting");
    submitMutation.mutate({
      risposte: cleanAnswers,
      eta: parseInt(eta),
      visitorId: generateVisitorId(),
    });
  };

  if (isLoading) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-20 text-center">
        <div className="animate-pulse">
          <div className="w-16 h-16 rounded-full bg-primary/20 mx-auto mb-4" />
          <div className="h-6 bg-muted rounded w-48 mx-auto mb-2" />
          <div className="h-4 bg-muted rounded w-64 mx-auto" />
        </div>
      </div>
    );
  }

  // Welcome phase
  if (phase === "welcome") {
    return (
      <div className="max-w-2xl mx-auto px-4 py-12 sm:py-20">
        <div className="text-center mb-8">
          <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
            <TreePine className="w-8 h-8 text-primary" />
          </div>
          <h1 className="text-3xl md:text-4xl font-serif font-bold mb-3" data-testid="text-test-welcome">
            Benvenuto al Test dei 9 Frutti
          </h1>
          <p className="text-muted-foreground max-w-lg mx-auto">
            Scopri il tuo enneatipo attraverso 180 domande vero/falso. Il test richiede circa 20 minuti. 
            Rispondi con sincerità, non esiste una risposta giusta o sbagliata.
          </p>
        </div>

        <Card className="mb-6">
          <CardContent className="p-6">
            <label className="block text-sm font-medium mb-2">
              Parlaci di te (opzionale)
            </label>
            <Textarea
              placeholder="Puoi condividere le tue aspettative o cosa ti ha portato qui..."
              value={intro}
              onChange={(e) => setIntro(e.target.value)}
              className="min-h-[100px]"
              data-testid="input-intro"
            />
          </CardContent>
        </Card>

        <div className="flex justify-center">
          <Button
            size="lg"
            className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold"
            onClick={() => setPhase("test")}
            data-testid="button-start-test"
          >
            {intro.trim() ? "Inizia il Test" : "Salta e Inizia Test"}
            <ArrowRight className="ml-2 w-4 h-4" />
          </Button>
        </div>
      </div>
    );
  }

  // Age input phase
  if (phase === "age") {
    return (
      <div className="max-w-md mx-auto px-4 py-12 sm:py-20 text-center">
        <CheckCircle2 className="w-16 h-16 text-green-500 mx-auto mb-4" />
        <h2 className="text-2xl font-serif font-bold mb-2" data-testid="text-age-title">
          Test Completato!
        </h2>
        <p className="text-muted-foreground mb-6">
          Inserisci la tua età per calcolare il percorso evolutivo personalizzato.
        </p>
        <Input
          type="number"
          placeholder="La tua età"
          value={eta}
          onChange={(e) => setEta(e.target.value)}
          className="text-center text-lg mb-4"
          min={1}
          max={120}
          data-testid="input-age"
        />
        <Button
          size="lg"
          className="w-full bg-primary hover:bg-primary/90"
          onClick={handleSubmit}
          disabled={!eta || parseInt(eta) < 1 || submitMutation.isPending}
          data-testid="button-submit-test"
        >
          {submitMutation.isPending ? "Calcolo in corso..." : "Scopri il Tuo Enneatipo"}
          <ArrowRight className="ml-2 w-4 h-4" />
        </Button>
        {submitMutation.isError && (
          <p className="text-destructive text-sm mt-3">
            Errore durante l'invio. Riprova.
          </p>
        )}
      </div>
    );
  }

  // Submitting phase
  if (phase === "submitting") {
    return (
      <div className="max-w-md mx-auto px-4 py-20 text-center">
        <div className="animate-spin w-12 h-12 border-4 border-primary border-t-transparent rounded-full mx-auto mb-4" />
        <p className="text-muted-foreground">Calcolo del tuo enneatipo in corso...</p>
      </div>
    );
  }

  // Test phase
  if (!currentFruit) return null;

  return (
    <div className="max-w-3xl mx-auto px-4 py-6 sm:py-10">
      {/* Progress */}
      <div className="mb-6">
        <div className="flex items-center justify-between text-sm mb-2">
          <span className="text-muted-foreground">
            Frutto {currentFruitIndex + 1} di {sortedFruits.length}: <strong className="text-foreground">{fruitEmoji[currentFruit.nome]} {currentFruit.nome}</strong>
          </span>
          <span className="text-muted-foreground">{Math.round(progressPercent)}%</span>
        </div>
        <Progress value={progressPercent} className="h-2" data-testid="progress-test" />
      </div>

      {/* Fruit navigation dots */}
      <div className="flex gap-1.5 justify-center mb-6">
        {sortedFruits.map((fruit, idx) => {
          const fruitAnswers = answers[fruit.nome] || [];
          const isComplete = fruitAnswers.length >= 20 && fruitAnswers.slice(0, 20).every(a => a === true || a === false);
          const isCurrent = idx === currentFruitIndex;
          return (
            <button
              key={fruit.nome}
              onClick={() => setCurrentFruitIndex(idx)}
              className={`w-8 h-8 rounded-full text-xs font-medium transition-all flex items-center justify-center ${
                isCurrent
                  ? "bg-primary text-white scale-110"
                  : isComplete
                    ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400"
                    : "bg-muted text-muted-foreground hover:bg-muted/80"
              }`}
              title={fruit.nome}
              data-testid={`btn-fruit-nav-${idx}`}
            >
              {isComplete ? "✓" : idx + 1}
            </button>
          );
        })}
      </div>

      {/* Questions */}
      <div className="space-y-3">
        {currentFruit.domande.map((question, qIdx) => (
          <Card
            key={qIdx}
            className={`transition-all ${(currentAnswers[qIdx] === true || currentAnswers[qIdx] === false) ? "border-green-200 dark:border-green-800/50 bg-green-50/30 dark:bg-green-900/10" : ""}`}
          >
            <CardContent className="p-4">
              <div className="flex gap-4 items-start">
                <span className="text-xs text-muted-foreground mt-1 shrink-0 w-6 text-right">{qIdx + 1}.</span>
                <div className="flex-1">
                  <p className="text-sm leading-relaxed mb-3">{question}</p>
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleAnswer(qIdx, true)}
                      className={`px-4 py-1.5 rounded-lg text-sm font-medium transition-all ${
                        currentAnswers[qIdx] === true
                          ? "bg-primary text-white"
                          : "bg-muted text-muted-foreground hover:bg-primary/10 hover:text-primary"
                      }`}
                      data-testid={`btn-answer-${qIdx}-true`}
                    >
                      Vero
                    </button>
                    <button
                      onClick={() => handleAnswer(qIdx, false)}
                      className={`px-4 py-1.5 rounded-lg text-sm font-medium transition-all ${
                        currentAnswers[qIdx] === false
                          ? "bg-primary text-white"
                          : "bg-muted text-muted-foreground hover:bg-primary/10 hover:text-primary"
                      }`}
                      data-testid={`btn-answer-${qIdx}-false`}
                    >
                      Falso
                    </button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Navigation */}
      <div className="flex justify-between items-center mt-8 pb-8">
        <Button
          variant="outline"
          onClick={() => setCurrentFruitIndex(Math.max(0, currentFruitIndex - 1))}
          disabled={currentFruitIndex === 0}
          data-testid="button-prev-fruit"
        >
          <ArrowLeft className="mr-2 w-4 h-4" /> Precedente
        </Button>

        {currentFruitIndex < sortedFruits.length - 1 ? (
          <Button
            onClick={() => setCurrentFruitIndex(currentFruitIndex + 1)}
            className="bg-primary hover:bg-primary/90"
            data-testid="button-next-fruit"
          >
            Prossimo Frutto <ArrowRight className="ml-2 w-4 h-4" />
          </Button>
        ) : (
          <Button
            onClick={() => setPhase("age")}
            className="bg-green-600 hover:bg-green-700 text-white"
            disabled={!isTestComplete}
            data-testid="button-finish-test"
          >
            Completa il Test <CheckCircle2 className="ml-2 w-4 h-4" />
          </Button>
        )}
      </div>
    </div>
  );
}
