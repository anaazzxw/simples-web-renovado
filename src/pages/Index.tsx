
import React, { useState, useEffect } from "react";
import PasswordGenerator from "../components/PasswordGenerator";

const Index = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-blue-900 to-black">
      <PasswordGenerator />
    </div>
  );
};

export default Index;
