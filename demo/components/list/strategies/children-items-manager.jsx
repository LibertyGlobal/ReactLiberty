class ChildrenScroller {
  constructor(carusel) {
    this.carusel = carusel;
  }

  getNumberOfItemsVisible() {
    return Math.floor(this.carusel.props.style[this.carusel.sizeProperty] / this.getSizeForItem(0)) - 1;
  }

  getScrollForItem(itemIndex) {
    var moveTo = 0;
    var movedTo = this.carusel.movedTo;
    var currentIndex = this.carusel.state.currentIndex;
    var itemsLength = this.getVisibleItems().length;

    console.log(this.getVisibleRange());

    var itemsOnScreen = this.getNumberOfItemsVisible();
    var itemSize = this.getSizeForItem(0);
    var focusedItemPosition = currentIndex * itemSize;
    var focusedItemVisibleFrom = Math.max(0, focusedItemPosition - (itemsOnScreen * itemSize));
    var focusedItemVisibleTo = Math.min(itemsLength * itemSize, focusedItemPosition + (itemsOnScreen * itemSize));

    if (Math.abs(movedTo) > focusedItemPosition || focusedItemVisibleFrom > Math.abs(movedTo)) {
      var deltaTo = Math.abs(movedTo + focusedItemPosition);
      var deltaFrom = Math.abs(movedTo + focusedItemVisibleFrom);

      if (Math.ceil(deltaTo) > Math.ceil(deltaFrom)) {
        moveTo = focusedItemVisibleFrom;
      } else {
        moveTo = focusedItemPosition;
      }
    } else {
      moveTo = Math.abs(movedTo) || 0;
    }

    return moveTo;
  }

  getVisibleRange() {
    var result = {};
    var items = this.getVisibleItems();
    var screenPosition = this.carusel.movedTo;
    var screenEnds = this.carusel.movedTo + this.carusel.props.style[this.carusel.sizeProperty];

    result.min = 0;
    result.max = 0;

    for (var i = 0; i < items.length; i++) {
      var item = items[i];
      var itemPosition = this.getPositionForItem(i);
      var itemSize = this.getSizeForItem(i);
      var itemEnds = itemPosition + itemSize;

      if (screenPosition < itemEnds && !result.min) {
        result.min = i;
      }

      if (screenEnds < itemPosition && !result.max) {
        result.max = i;
      }
    }

    return result;
  }

  getPositionForItem(itemIndex) {
    //TODO for flexible items sizes
    var items = this.getVisibleItems();
    var result = 0;
    for (var i = 0; i < itemIndex; i++) {
      result += this.getSizeForItem(i);
    }
    return result;
  }

  getSizeForItem(itemIndex) {
    var sampleItemStyle = this.carusel.props.children[itemIndex].props.style || {};

    if (!this.itemSize) {
      var itemClass = this.carusel.props.itemClass;
      this.itemSize = 0;
      this.itemSize += sampleItemStyle[this.carusel.sizeProperty] || 0;
      this.itemSize += sampleItemStyle['margin' + this.carusel.CSSNegativeProperty] || 0;
      this.itemSize += sampleItemStyle['margin' + this.carusel.CSSPositiveProperty] || 0;
      this.itemSize += sampleItemStyle['padding' + this.carusel.CSSNegativeProperty] || 0;
      this.itemSize += sampleItemStyle['padding' + this.carusel.CSSPositiveProperty] || 0;
    }

    return this.itemSize;
  }

  getVisibleItems() {
    return this.carusel.props.children;
  }

  getHighlightClass() {
    return null;
  }
}

module.exports = ChildrenScroller;