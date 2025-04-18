function runWidget() {
  if (document.getElementById('link-color-widget')) return;

  const box = document.createElement('div');
  box.id = 'link-color-widget';
  box.style = `
    position: fixed;
    bottom: 20px;
    right: 20px;
    padding: 10px;
    background: white;
    border: 2px solid black;
    border-radius: 10px;
    box-shadow: 0 0 10px rgba(0,0,0,0.3);
    font-family: sans-serif;
    z-index: 999999;
  `;

  const title = document.createElement('div');
  title.textContent = 'Link Color Widget';
  title.style = 'font-weight: bold; margin-bottom: 8px;';
  box.appendChild(title);

  const colors = ['red', 'purple', 'blue', 'reset'];
  colors.forEach(color => {
    const btn = document.createElement('button');
    btn.textContent = color.charAt(0).toUpperCase() + color.slice(1);
    btn.style = 'margin: 3px; padding: 5px 10px;';
    btn.onclick = () => {
      document.querySelectorAll('a').forEach(link => {
        link.style.color = color === 'reset' ? '' : color;
      });
    };
    box.appendChild(btn);
  });

  const close = document.createElement('button');
  close.textContent = '×';
  close.style = `
    position: absolute;
    top: 5px;
    right: 10px;
    border: none;
    background: transparent;
    font-size: 16px;
    cursor: pointer;
  `;
  close.onclick = () => box.remove();
  box.appendChild(close);

  document.body.appendChild(box);
}
