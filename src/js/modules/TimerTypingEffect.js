class TimerTypingEffect {
  constructor(selector, typingSpeed = 45, erasingSpeed = 15, delay = 22000) {
    this.typingElement = document.querySelector(selector);
    if (this.typingElement) {
      this.phrases = this.typingElement.getAttribute('data-typing').split('; ');
      this.typingSpeed = typingSpeed;
      this.erasingSpeed = erasingSpeed;
      this.delay = delay;
      this.initializeTypingWorker();
    }
  }

  initializeTypingWorker() {
    if (!this.typingElement) return;

    const workerCode = `
      self.onmessage = function (e) {
        const { command, typingSpeed, erasingSpeed, delay, phrases } = e.data;

        if (command === 'startTyping') {
          let currentPhraseIndex = 0;
          let currentLetterIndex = 0;
          let isErasing = false;

          function type() {
            if (!isErasing && currentLetterIndex < phrases[currentPhraseIndex].length) {
              currentLetterIndex++;
              postMessage({
                command: 'updateText',
                text: phrases[currentPhraseIndex].substring(0, currentLetterIndex)
              });
              setTimeout(type, typingSpeed);
            } else if (!isErasing) {
              isErasing = true;
              setTimeout(type, delay);
            } else if (isErasing && currentLetterIndex > 0) {
              currentLetterIndex--;
              postMessage({
                command: 'updateText',
                text: phrases[currentPhraseIndex].substring(0, currentLetterIndex)
              });
              setTimeout(type, erasingSpeed);
            } else if (isErasing && currentLetterIndex === 0) {
              isErasing = false;
              currentPhraseIndex++;

              if (currentPhraseIndex < phrases.length) {
                setTimeout(type, typingSpeed);
              } else {
                postMessage({
                  command: 'done',
                  text: phrases[phrases.length - 1]
                });
              }
            }
          }

          type();
        }
      };
    `;

    const blob = new Blob([workerCode], { type: 'application/javascript' });
    this.worker = new Worker(URL.createObjectURL(blob));

    this.worker.onmessage = (e) => {
      const { command, text } = e.data;
      if (command === 'updateText' && this.typingElement) {
        this.typingElement.textContent = text;
      } else if (command === 'done' && this.typingElement) {
        this.typingElement.textContent = text;
        this.worker.terminate();
      }
    };

    this.start();
  }

  start() {
    if (this.worker) {
      this.worker.postMessage({
        command: 'startTyping',
        typingSpeed: this.typingSpeed,
        erasingSpeed: this.erasingSpeed,
        delay: this.delay,
        phrases: this.phrases,
      });
    }
  }
}

function startTimer(duration, display, onEnd = null) {
  if (!display) return;

  const workerCode = `
    self.onmessage = function (e) {
      const { command, duration } = e.data;

      if (command === 'startTimer') {
        let timer = duration;

        function updateTimer() {
          if (timer < 0) {
            postMessage({ command: 'done' });
            return;
          }

          postMessage({ command: 'update', timer });
          timer--;
          setTimeout(updateTimer, 1000);
        }

        updateTimer();
      }
    };
  `;

  const blob = new Blob([workerCode], { type: 'application/javascript' });
  const worker = new Worker(URL.createObjectURL(blob));

  worker.onmessage = (e) => {
    const { command, timer } = e.data;

    if (command === 'update') {
      const minutes = Math.floor(timer / 60);
      const seconds = timer % 60;

      const formattedMinutes = minutes < 10 ? `${minutes}` : minutes;
      const formattedSeconds = seconds < 10 ? `0${seconds}` : seconds;

      if (display) {
        display.textContent = `${formattedMinutes}:${formattedSeconds}`;
      }
      
      const circle = document.getElementById('circle');
      if (circle) {
        const percent = (timer / duration) * 100;
        circle.style.strokeDasharray = `${percent}, 100`;
      }
    } else if (command === 'done') {
      if (display) {
        display.textContent = "00:00";
      }
      const circle = document.getElementById('circle');
      if (circle) {
        circle.style.strokeDasharray = `0, 100`;
      }

      if (typeof onEnd === 'function') {
        onEnd();
      }
      worker.terminate();
    }
  };

  worker.postMessage({
    command: 'startTimer',
    duration: duration
  });
}

window.onload = function () {
  new TimerTypingEffect('.js-typing-cursor');
  const timeInMinutes = 2.5;
  const display = document.querySelector('.js-timer');

  if (display) {
    startTimer(timeInMinutes * 60, display, () => {
      window.location.href = 'index.html';
    });
  }
};
