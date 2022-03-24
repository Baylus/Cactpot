import { render } from "react-dom";

import App from "./App";
import Game from "./Game";

const rootElement = document.getElementById("root");
// Overly complicated inline math for creating an array of numbers 1-9 that is randomized
// render(
//   <App
//     boardValues={[...Array.from({ length: 9 }, (_, i) => i + 1)].sort(
//       (a, b) => 0.5 - Math.random()
//     )}
//   />,
//   rootElement
// );
render(<Game />, rootElement);

// Working render before gameboard extraction
// render(
//   <App
//     boardValues={[...Array.from({ length: 9 }, (_, i) => i + 1)].sort(
//       (a, b) => 0.5 - Math.random()
//     )}
//   />,
//   rootElement
// );
