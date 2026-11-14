export function playBell() {
  const audioContext = new (
    window.AudioContext || window.webkitAudioContext
  )();

  const oscillator = audioContext.createOscillator();
  const gain = audioContext.createGain();

  oscillator.connect(gain);
  gain.connect(audioContext.destination);

  oscillator.type = "sine";
  oscillator.frequency.setValueAtTime(
    880,
    audioContext.currentTime
  );

  gain.gain.setValueAtTime(
    0.3,
    audioContext.currentTime
  );

  gain.gain.exponentialRampToValueAtTime(
    0.001,
    audioContext.currentTime + 1.5
  );

  oscillator.start();
  oscillator.stop(audioContext.currentTime + 1.5);

  oscillator.onended = () => audioContext.close();
}