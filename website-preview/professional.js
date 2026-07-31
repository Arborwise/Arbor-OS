(()=>{
  'use strict';

  const BASE_BUILD='https://cdn.jsdelivr.net/gh/Arborwise/Arbor-OS@f63013983ef3a82fe01acb614a710122e5c57a81/website-preview/professional.js';

  function installAnnieVoice(){
    const button=document.getElementById('annieButton');
    const tip=document.getElementById('annieTip');
    const synth=window.speechSynthesis;
    if(!button||!tip)return;

    button.setAttribute('aria-label','Hear Annie read another tree-care tip aloud');

    if(!synth||typeof window.SpeechSynthesisUtterance!=='function'){
      button.title='Spoken tips are not supported by this browser.';
      return;
    }

    let voices=[];
    const loadVoices=()=>{voices=synth.getVoices()||[];};
    loadVoices();
    if(typeof synth.addEventListener==='function')synth.addEventListener('voiceschanged',loadVoices);
    else synth.onvoiceschanged=loadVoices;

    const chooseVoice=()=>{
      const english=voices.filter(voice=>/^en(?:-|_)/i.test(voice.lang||''));
      const pool=english.length?english:voices;
      const preferred=[
        /samantha/i,/ava/i,/serena/i,/victoria/i,/karen/i,/moira/i,/tessa/i,
        /zira/i,/jenny/i,/aria/i,/google us english/i,/female/i
      ];
      for(const pattern of preferred){
        const match=pool.find(voice=>pattern.test(voice.name||''));
        if(match)return match;
      }
      return pool.find(voice=>!/(?:male|david|mark|daniel|fred)/i.test(voice.name||''))||pool[0]||null;
    };

    const normalLabel='Hear another Annie tip';
    button.addEventListener('click',()=>{
      requestAnimationFrame(()=>{
        const text=String(tip.textContent||'').trim();
        if(!text)return;

        synth.cancel();
        const utterance=new SpeechSynthesisUtterance(text);
        const voice=chooseVoice();
        if(voice)utterance.voice=voice;
        utterance.lang=voice?.lang||'en-US';
        utterance.rate=.84;
        utterance.pitch=.96;
        utterance.volume=1;

        button.textContent='Annie is speaking…';
        button.classList.add('annie-speaking');
        const restore=()=>{
          button.textContent=normalLabel;
          button.classList.remove('annie-speaking');
        };
        utterance.onend=restore;
        utterance.onerror=restore;
        synth.speak(utterance);
      });
    });

    document.addEventListener('visibilitychange',()=>{
      if(document.hidden)synth.cancel();
    });
  }

  const base=document.createElement('script');
  base.src=BASE_BUILD;
  base.async=false;
  base.onload=installAnnieVoice;
  base.onerror=()=>console.error('The Arborwise website base build could not be loaded.');
  document.head.appendChild(base);
})();
