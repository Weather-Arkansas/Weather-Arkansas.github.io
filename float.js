function runWidget() {
  if (document.getElementById('link-color-widget')) return; // Prevent duplicates

  // Create widget container
  const box = document.createElement('div');
  box.id = 'link-color-widget';
  box.style.position = 'fixed';
  box.style.bottom = '20px';
  box.style.right = '20px';
  box.style.padding = '10px';
  box.style.background = 'white';
  box.style.border = '2px solid black';
  box.style.borderRadius = '10px';
  box.style.boxShadow = '0 0 10px rgba(0,0,0,0.3)';
  box.style.fontFamily = 'sans-serif';
  box.style.zIndex = '999999';

  // Title
  const title = document.createElement('div');
  title.textContent = 'Link Color Control';
  title.style.fontWeight = 'bold';
  title.style.marginBottom = '8px';
  box.appendChild(title);

  // Button factory
  function makeButton(label, color) {
    const btn = document.createElement('button');
    btn.textContent = label;
    btn.style.margin = '3px';
    btn.style.padding = '5px 10px';
    btn.style.cursor = 'pointer';
    btn.onclick = () => {
      document.querySelectorAll('a').forEach(link => {
        link.style.color = color;
      });
    };
    return btn;
  }

  // Add buttons
  box.appendChild(makeButton('Red', 'red'));
  box.appendChild(makeButton('Purple', 'purple'));
  box.appendChild(makeButton('Blue', 'blue'));
  box.appendChild(makeButton('Reset', ''));

  // Close button
  const closeBtn = document.createElement('button');
  closeBtn.textContent = '✖';
  closeBtn.style.position = 'absolute';
  closeBtn.style.top = '5px';
  closeBtn.style.right = '5px';
  closeBtn.style.border = 'none';
  closeBtn.style.background = 'transparent';
  closeBtn.style.fontSize = '14px';
  closeBtn.style.cursor = 'pointer';
  closeBtn.onclick = () => box.remove();
  box.appendChild(closeBtn);

  document.body.appendChild(box);
}
