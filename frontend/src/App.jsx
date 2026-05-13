// App.jsx

import { useState } from 'react';
import Header from './components/Header';
import JobForm from './components/JobForm';
import JobResult from './components/JobResult';

function App() {
  const [state, setState] = useState('idle');
  const [result, setResult] = useState('');
  const [error, setError] = useState('');
  const [formData, setFormData] = useState(null);

  const handleGenerate = async (data) => {
    setState('loading');
    setFormData(data);
    setError('');

    try {
      const response = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      const json = await response.json();

      if (!response.ok) {
        throw new Error(json.error || 'Generation failed');
      }

      setResult(json.result);
      setState('result');
    } catch (err) {
      setError(err.message || 'Something went wrong');
      setState('error');
    }
  };

  const handleReset = () => {
    setState('idle');
    setResult('');
    setError('');
  };

  return (
    <div className="page-bg">
      <Header />

      <main className="page-main">
        {(state === 'idle' || state === 'loading' || state === 'error') && (
          <JobForm
            onGenerate={handleGenerate}
            isLoading={state === 'loading'}
            error={error}
          />
        )}

        {state === 'result' && result && formData && (
          <JobResult
            result={result}
            jobTitle={formData.jobTitle}
            onReset={handleReset}
          />
        )}
      </main>
    </div>
  );
}

export default App;