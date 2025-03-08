import React from "react";

function Footer() {
    return (
      <footer className="bg-black text-white py-4 mt-10">
        <div className="container mx-auto text-center">
          <p>&copy; {new Date().getFullYear()} Computer Science,  Faculty of Science and Technology<br/>
          Songklha Rajabhat Unvisertiy. All rights reserved.</p>
  
        </div>
      </footer>
    );
  };
  
  export default Footer;