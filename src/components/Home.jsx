import React from "react";

const Home = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-4 text-center">Welcome to the CKD Platform</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-4 bg-blue-100 rounded shadow">Card 1</div>
        <div className="p-4 bg-blue-200 rounded shadow">Card 2</div>
        <div className="p-4 bg-blue-300 rounded shadow">Card 3</div>
        <div className="p-4 bg-blue-400 rounded shadow">Card 4</div>
      </div>
    </div>
  );
};

export default Home;
