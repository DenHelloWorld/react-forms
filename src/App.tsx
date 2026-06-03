const App = () => {
  return (
    <div className="min-h-screen bg-bg text-text p-8">
      <h1 className="text-3xl font-heading text-text-h font-bold">
        React Forms
      </h1>
      <div className="mt-4 flex gap-2">
        <button
          type="button"
          className="cursor-pointer rounded bg-accent px-4 py-2 text-white hover:opacity-90"
        >
          Uncontrolled Form
        </button>
        <button
          type="button"
          className="cursor-pointer rounded border border-accent-border bg-accent-bg px-4 py-2 text-accent hover:bg-accent hover:text-white"
        >
          React Hook Form
        </button>
      </div>
    </div>
  );
};

export default App;
