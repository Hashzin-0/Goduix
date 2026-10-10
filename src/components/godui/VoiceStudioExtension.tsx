import React, { useEffect, useRef, useState } from 'react';
import { AudioLines, Mic, MicOff, Play, Square, Volume2, ExternalLink } from 'lucide-react';

type SpeechRecognitionAlternativeLike = { transcript: string };
type SpeechRecognitionResultLike = { 0: SpeechRecognitionAlternativeLike; isFinal: boolean };
type SpeechRecognitionEventLike = { resultIndex: number; results: ArrayLike<SpeechRecognitionResultLike> };
type SpeechRecognitionLike = {
  lang: string;
  interimResults: boolean;
  continuous: boolean;
  onresult: ((event: SpeechRecognitionEventLike) => void) | null;
  onerror: (() => void) | null;
  onend: (() => void) | null;
  start: () => void;
  stop: () => void;
};
type SpeechWindow = Window & {
  SpeechRecognition?: new () => SpeechRecognitionLike;
  webkitSpeechRecognition?: new () => SpeechRecognitionLike;
};

export interface VoiceStudioExtensionProps {
  title?: string;
  defaultText?: string;
  language?: string;
  voiceStudioUrl?: string;
  accentColor?: string;
}

export const VoiceStudioExtension: React.FC<VoiceStudioExtensionProps> = ({
  title = 'Voice Studio',
  defaultText = 'Olá! Este é o módulo de voz do GodUI.',
  language = 'pt-BR',
  voiceStudioUrl = 'http://localhost:3900',
  accentColor = '#67e8f9',
}) => {
  const [text, setText] = useState(defaultText);
  const [speaking, setSpeaking] = useState(false);
  const [listening, setListening] = useState(false);
  const [voiceName, setVoiceName] = useState('');
  const [rate, setRate] = useState(1);
  const [pitch, setPitch] = useState(1);
  const [error, setError] = useState('');
  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);
  const recognitionRef = useRef<SpeechRecognitionLike | null>(null);
  const recognitionConstructor = typeof window === 'undefined' ? undefined : (window as SpeechWindow).SpeechRecognition ?? (window as SpeechWindow).webkitSpeechRecognition;

  useEffect(() => {
    if (!('speechSynthesis' in window)) return;
    const refresh = () => {
      const availableVoices = window.speechSynthesis.getVoices();
      setVoices(availableVoices);
      setVoiceName((current) => current || availableVoices.find((voice) => voice.lang.toLowerCase().startsWith(language.toLowerCase()))?.name || '');
    };
    refresh();
    window.speechSynthesis.addEventListener?.('voiceschanged', refresh);
    return () => {
      window.speechSynthesis.removeEventListener?.('voiceschanged', refresh);
      window.speechSynthesis.cancel();
    };
  }, [language]);

  const speak = () => {
    if (!('speechSynthesis' in window) || !text.trim()) {
      setError('A síntese de voz não está disponível neste navegador ou o texto está vazio.');
      return;
    }
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text.trim());
    utterance.lang = language;
    utterance.rate = rate;
    utterance.pitch = pitch;
    const voice = window.speechSynthesis.getVoices().find((item) => item.name === voiceName);
    if (voice) utterance.voice = voice;
    utterance.onstart = () => { setSpeaking(true); setError(''); };
    utterance.onend = () => setSpeaking(false);
    utterance.onerror = () => { setSpeaking(false); setError('Não foi possível reproduzir a fala.'); };
    window.speechSynthesis.speak(utterance);
  };

  const stop = () => {
    window.speechSynthesis?.cancel();
    recognitionRef.current?.stop();
    recognitionRef.current = null;
    setSpeaking(false);
    setListening(false);
  };

  const toggleListening = () => {
    if (listening) {
      recognitionRef.current?.stop();
      recognitionRef.current = null;
      setListening(false);
      return;
    }
    if (!recognitionConstructor) {
      setError('Reconhecimento de voz não suportado neste navegador. Tente Chrome ou Edge.');
      return;
    }
    const recognition = new recognitionConstructor();
    recognitionRef.current = recognition;
    recognition.lang = language;
    recognition.interimResults = true;
    recognition.continuous = false;
    recognition.onresult = (event) => {
      const transcript = Array.from({ length: event.results.length }, (_, index) => event.results[index][0].transcript).join(' ');
      setText(transcript);
    };
    recognition.onerror = () => { setListening(false); setError('O microfone não pôde ser acessado. Verifique a permissão do navegador.'); };
    recognition.onend = () => { setListening(false); recognitionRef.current = null; };
    setListening(true);
    setError('');
    try { recognition.start(); } catch { setListening(false); setError('Não foi possível iniciar a captura de voz.'); }
  };

  return (
    <section className="mx-auto w-full max-w-2xl overflow-hidden rounded-3xl border border-white/10 bg-zinc-950/90 text-white shadow-2xl">
      <header className="flex items-center justify-between gap-3 border-b border-white/10 px-5 py-4">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-2xl border border-white/10 bg-white/5" style={{ color: accentColor }}>
            <AudioLines size={20} />
          </div>
          <div>
            <h3 className="text-sm font-semibold">{title}</h3>
            <p className="text-xs text-zinc-400">Síntese e captura de voz no navegador</p>
          </div>
        </div>
        <a href={/^https?:\/\//i.test(voiceStudioUrl) ? voiceStudioUrl : 'http://localhost:3900'} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1.5 rounded-xl border border-white/10 px-3 py-2 text-xs text-zinc-300 transition-colors hover:bg-white/10">
          VoiceStudio <ExternalLink size={12} />
        </a>
      </header>
      <div className="space-y-4 p-5">
        <label className="block text-xs font-medium text-zinc-300">
          Texto para falar
          <textarea value={text} onChange={(event) => setText(event.target.value)} rows={4} className="mt-2 w-full resize-y rounded-2xl border border-white/10 bg-black/30 p-3 text-sm leading-relaxed outline-none transition-colors focus:border-cyan-300/60" placeholder="Digite ou dite o texto..." />
        </label>
        <div className="grid gap-3 sm:grid-cols-2">
          <label className="block text-xs text-zinc-400">Voz do navegador
            <select value={voiceName} onChange={(event) => setVoiceName(event.target.value)} className="mt-2 w-full rounded-xl border border-white/10 bg-zinc-900 p-2.5 text-sm text-white">
              <option value="">Padrão do sistema</option>
              {voices.map((voice) => <option key={voice.name} value={voice.name}>{voice.name} ({voice.lang})</option>)}
            </select>
          </label>
          <label className="block text-xs text-zinc-400">Idioma
            <select value={language} onChange={(event) => { setError(''); }} disabled className="mt-2 w-full rounded-xl border border-white/10 bg-zinc-900 p-2.5 text-sm text-white">
              <option value={language}>{language}</option>
            </select>
          </label>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <label className="text-xs text-zinc-400">Velocidade <span className="text-zinc-200">{rate.toFixed(1)}×</span>
            <input aria-label="Velocidade da fala" type="range" min="0.6" max="1.6" step="0.1" value={rate} onChange={(event) => setRate(Number(event.target.value))} className="mt-2 w-full accent-cyan-300" />
          </label>
          <label className="text-xs text-zinc-400">Tom <span className="text-zinc-200">{pitch.toFixed(1)}</span>
            <input aria-label="Tom da voz" type="range" min="0.6" max="1.6" step="0.1" value={pitch} onChange={(event) => setPitch(Number(event.target.value))} className="mt-2 w-full accent-cyan-300" />
          </label>
        </div>
        <div className="flex flex-wrap gap-2">
          <button type="button" onClick={speak} disabled={speaking} className="inline-flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-semibold text-zinc-950 disabled:opacity-50" style={{ backgroundColor: accentColor }}><Play size={15} /> Reproduzir</button>
          <button type="button" onClick={stop} disabled={!speaking} className="inline-flex items-center gap-2 rounded-xl border border-white/10 px-4 py-2.5 text-sm text-white disabled:opacity-40"><Square size={14} /> Parar</button>
          <button type="button" onClick={toggleListening} className="inline-flex items-center gap-2 rounded-xl border border-white/10 px-4 py-2.5 text-sm text-white hover:bg-white/5">
            {listening ? <MicOff size={15} /> : <Mic size={15} />} {listening ? 'Encerrar captura' : 'Ditar texto'}
          </button>
          <span className="ml-auto inline-flex items-center gap-1.5 text-xs text-zinc-500"><Volume2 size={14} /> {speaking ? 'Falando' : listening ? 'Ouvindo' : 'Pronto'}</span>
        </div>
        {error && <p role="status" className="rounded-xl border border-amber-400/20 bg-amber-400/5 px-3 py-2 text-xs text-amber-200">{error}</p>}
        <p className="text-[11px] leading-relaxed text-zinc-500">A síntese e a captura usam APIs do navegador. O VoiceStudio local é um serviço separado: o botão abre a instância configurada, mas este painel ainda não envia áudio ou texto à API do VoiceStudio.</p>
      </div>
    </section>
  );
};
