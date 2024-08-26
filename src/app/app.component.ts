import { Component, DestroyRef, OnInit, effect, inject, signal } from '@angular/core';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { Observable, Subscriber, interval, map } from 'rxjs';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {
  private destroyRef = inject(DestroyRef)

  // //signal to observable
  // clickCount = signal(0)
  // clickCount$ = toObservable(this.clickCount)

  // // observable to signal
  // intervalCount$ = interval(1000)
  // intervalSignal = toSignal(this.intervalCount$, { initialValue: 0 })

  //custom observable
  customInterval$ = new Observable((subscriber) => {
    let executionCount = 0;
    const interval = setInterval(() => {
      if (executionCount > 3) {
        clearInterval(interval);
        subscriber.complete();
        return;

      }
      console.log('entering message from observable....')
      subscriber.next({ message: 'new message' })
      executionCount++;
    }, 2000)
  })

  constructor() {
    //using effect to listen to the signalCount 
    // effect(() => {
    //   console.log(`button clicked ${this.clickCount()} times.`)
    // })

  }
  ngOnInit(): void {
    // using interval observable from rjxs
    // const subscription = interval(1000)
    //   .pipe(
    //     map((val) => val * 2)
    //   )
    //   .subscribe({
    //     next: (val) => console.log(val)
    //   })

    // const subscription = this.clickCount$.subscribe({
    //   next: (val) => console.log(`button clicked ${val} times.`)
    // })

    // this.destroyRef.onDestroy(() => {
    //   subscription.unsubscribe();
    // })

    this.customInterval$.subscribe({
      next: (val) => console.log(val),
      complete: () => console.log('COMPLETED')
    })

  }

  onClick() {
    // this.clickCount.update(prevCount => prevCount + 1)
  }
}
