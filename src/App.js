import { useState } from "react";
import Timer from "./Timer/Timer";
import { interval } from "rxjs";
import { map } from "rxjs/operators";
import "./App.css";

function App() {
  const [timer, setTimer] = useState(0);
  const [diff, setDiff] = useState(0);
  const [subscription, setSubscription] = useState("");
  const [prevent, setPrevent] = useState(true);

  const onStartHandler = () => {
    if (!subscription) {
      const timerSubscription = interval(1000)
        .pipe(map((val) => val + 1))
        .subscribe((val) => {
          setTimer(val + diff);
        });
      setSubscription(timerSubscription);
    } else {
      subscription.unsubscribe();
      setTimer(0);
      setDiff(0);
      setSubscription("");
    }
  };
  const onWaitHandler = (event) => {
    if (prevent) {
      setPrevent(false);
      const timerInstance = setTimeout(function () {
        setPrevent(true);
        clearTimeout(timerInstance);
      }, 300);
    } else {
      if (subscription) {
        subscription.unsubscribe();
      }
      setDiff(timer);
      setSubscription("");
    }
  };

  const onResetHandler = () => {
    if (subscription) {
      subscription.unsubscribe();
    }
    const timerSubscription = interval(1000).subscribe((val) => {
      setTimer(val);
    });
    setSubscription(timerSubscription);
  };

  return (
    <div className="App">
      <div className="timer-wrapper">
        <Timer
          timePassed={timer ? timer : diff}
          onStart={onStartHandler}
          onWait={onWaitHandler}
          onReset={onResetHandler}
        />
      </div>
    </div>
  );
}

export default App;
