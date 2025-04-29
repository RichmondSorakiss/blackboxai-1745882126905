document.addEventListener('DOMContentLoaded', () => {
  const optionsContainer = document.getElementById('options');
  const messageDiv = document.getElementById('message');

  // Fetch voting options from backend
  function fetchOptions() {
    fetch('/api/options')
      .then(response => response.json())
      .then(data => {
        renderOptions(data);
      })
      .catch(error => {
        console.error('Error fetching options:', error);
      });
  }

  // Render voting options
  function renderOptions(options) {
    optionsContainer.innerHTML = '';
    options.forEach(option => {
      const optionDiv = document.createElement('div');
      optionDiv.className = 'flex items-center justify-between p-3 border rounded hover:bg-gray-50 cursor-pointer transition';

      const nameSpan = document.createElement('span');
      nameSpan.textContent = option.name;
      nameSpan.className = 'text-lg font-medium';

      const voteCountSpan = document.createElement('span');
      voteCountSpan.textContent = option.votes;
      voteCountSpan.className = 'text-gray-600';

      optionDiv.appendChild(nameSpan);
      optionDiv.appendChild(voteCountSpan);

      optionDiv.addEventListener('click', () => {
        submitVote(option.id);
      });

      optionsContainer.appendChild(optionDiv);
    });
  }

  // Submit a vote to backend
  function submitVote(optionId) {
    fetch('/api/vote', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ optionId })
    })
      .then(response => response.json())
      .then(data => {
        if (data.success) {
          messageDiv.textContent = `You voted for "${data.option.name}"!`;
          fetchOptions();
        } else {
          messageDiv.textContent = 'Failed to submit vote.';
        }
      })
      .catch(error => {
        console.error('Error submitting vote:', error);
        messageDiv.textContent = 'Error submitting vote.';
      });
  }

  fetchOptions();
});
