import $ from "jquery";
import {Component} from "./component";

var windowScrollTop = function () {
    return window.pageYOffset;
};

export class ScrollLocker extends Component {
  constructor(element, fnScrollOffset){
    super();
    this.element=$(element);
    this.scrollOffset = fnScrollOffset || windowScrollTop;
    this.locked=false;
    this.initialOffsetTop = 0;
  }

  activate(element) {
    super.activate();
    if (element){
      this.element=$(element);
    }
    this.resetInitialOffsetTop();
    this.scrollHandler=(function(){
      this.toggleLock();
    }).bind(this);

    $(window).on('scroll',this.scrollHandler);
    return this;
  }

  deActivate() {
    super.deactivate();
    $(window).off('scroll',this.scrollHandler);
    return this;
  }

  offsetTop() {
    if (this.element[0]){
      return this.element[0].offsetTop;
    }
    else {
      return 0;
    }
  }

  resetInitialOffsetTop() {
    this.initialOffsetTop = this.offsetTop();
  }

  lock() {
    this.element.addClass('locked');
    this.locked = true;
  }

  unlock() {
      this.element.removeClass('locked');
      this.locked = false;
  }

  toggleLock() {
      if (this.locked === false && (this.offsetTop() - this.scrollOffset() < 0)) {
          this.lock();
      } else if (this.locked === true && (this.scrollOffset() <= this.initialOffsetTop)) {
          this.unlock();
      }
  }
}

