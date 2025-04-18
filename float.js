function runWidget() {
  const allLinks = document.querySelectorAll('a');
  allLinks.forEach(link => {
    link.style.color = 'purple'; // or 'red'
    link.style.textDecoration = 'underline dotted'; // optional styling
  });

  console.log(`Changed ${allLinks.length} links to purple.`);
}
