
export const emojisList = [
    "🎉", "🌈", "✨", "🌟", "🍕", "🍦", "🌴", "🏖️", 
    "👉",
    "🧸", "🐶", "🐱", "🐰", "🐭", "🐹", "🐯", "🐨", "🐻", "🐼",
    "🐷", "🐮", "🐸", "🐵", "🐔", "🐧", "🐦", "🐤", 
    "🦆", "🦅", "🦉", "🦜", "🐺", "🐗", "🐴", "🦄", 
    "😀", "😁", "😂", "😃", "😄", "😅", "😆", "😇", "😈", "😉",
    "😊", "😋", "😌", "😍", "😎", "😏", 
    "😘", "😙", "😚", "😛", "😜",     
    "😲", "😵", "😶", "😸", "😹", "😺", "😻",
    "👋🏼", "👍🏼", "👎🏼", "👊🏼", "👏🏼", "👐🏼", "💻", "🖥️", "⌨️", "🖱️", 
    "📞", "☎️", "💪🏻", "🤪", "🤩", "🤯", "🤑", "🤒", "🤓", 
    "🤔", "🤕", "🤖", "🤘", "🤙", "🤚", "🤝", 
    "🤞", "🤟", "🤠", "🤡", "🤣", "🤤", 
    "🤨", "🤩", "🤪", "🤫", "🤭","🤯", 
    "🤲", "🤳", "🤴", "🤵", "🤸", "🤹", 
    "🥁", "🥂", "🥃", "🥇", "🥈", "🥉", 
  ];

export function textSplit(elem) {
    return new SplitType(elem, { types: "words, chars" })
}

export function wordsSplit(elem) {
    return new SplitType(elem, { types: "words" })
}

export function disableScroll() {
    // console.log('disableScroll')
    // window.addEventListener('scroll', preventDefault);
    document.body.style.overflow = 'hidden';
}
  
  // Enable scrolling
export function enableScroll() {
    // console.log('enableScroll')
    document.body.style.overflow = 'auto';
}

export function removeScriptFromBody(srcUrl) {
    console.log('removeScriptFromBody')
    const bodyScripts = document.body.getElementsByTagName('script');
    for (let i = bodyScripts.length - 1; i >= 0; i--) {
      if (bodyScripts[i].src && bodyScripts[i].src.includes(srcUrl)) {
        bodyScripts[i].parentNode.removeChild(bodyScripts[i]);
      }
    }
}

export function addScriptToBody(srcUrl) {
    console.log('addScriptToBody')
    const script = document.createElement('script');
    script.src = srcUrl;
    script.type = 'module';
    document.body.appendChild(script);
}

export function addFilesCssToBody(cssFiles) {
    cssFiles.forEach(cssFile => {
      const linkTag = document.createElement('link');
      linkTag.rel = 'stylesheet';
      linkTag.href = cssFile;
      document.body.appendChild(linkTag);
    })
}
  
export function removeCssFilesFromBody(cssFiles) {
    cssFiles.forEach(cssFile => {
        const bodyLinks = document.body.getElementsByTagName('link');
        for (let i = bodyLinks.length - 1; i >= 0; i--) {
            if (bodyLinks[i].href && bodyLinks[i].href.includes(cssFile)) {
                bodyLinks[i].parentNode.removeChild(bodyLinks[i]);
            }
        }
    });
}


