import logoImage from "../LOGO-DOR.jpg";

function App() {
  return (
    <div>
      <header>
        <img src={logoImage} height="50px" width="50px" alt="Dor logo" />
        <h1>Dor's Homepage</h1>
        <button>Add a card</button>
      </header>

      <form className="card-form">
        <input type="text" placeholder="Q" />
        <input type="text" placeholder="A" />
        <span className="remainLetters">100</span>
        <select>
          <option value="">Choose category</option>
          <option value="names">Names</option>
          <option value="italy">Italy</option>
        </select>
        <button>Add</button>
      </form>

      <main>
        <aside>
          <ul>
            <li>
              <button>All</button>
            </li>
            <li>
              <button>Quiz</button>
            </li>
            <li>
              <button>Statistics</button>
            </li>
            <li>
              <button>Marathon</button>
            </li>
          </ul>
        </aside>

        <section>
          <ul>
            <li className="card">
              <p>card1</p>
            </li>
            <li className="card">
              <p>card2</p>
            </li>
          </ul>
        </section>
      </main>
    </div>
  );
}

export default App;
