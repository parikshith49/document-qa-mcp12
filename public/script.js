document.getElementById('askBtn').addEventListener('click', async () => {
    const query = document.getElementById('queryInput').value.trim();
    const answerBox = document.getElementById('answerBox');
  
    if (!query) {
      answerBox.textContent = 'Please enter a question.';
      return;
    }
  
    answerBox.textContent = 'Loading...';
  
    try {
      const response = await fetch('http://localhost:3000/tools/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ query })
      });
  
      const data = await response.json();
      answerBox.textContent = data.answer || 'No answer returned.';
    } catch (error) {
      answerBox.textContent = 'Error fetching answer.';
      console.error(error);
    }
  });
  