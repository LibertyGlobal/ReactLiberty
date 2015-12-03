var React = require('react');

class DataScroller {
    constructor(carusel) {
        this.carusel = carusel;
        this.getSizeForItem();
    }

    getNumberOfItemsVisible() {
        return Math.floor(this.carusel.props.style[this.carusel.sizeProperty] / this.itemSize) - 2;
    }

    getScrollForItem(itemIndex) {
        var moveTo = 0;
        var movedTo = this.carusel.movedTo;
        var itemsOnScreen = this.getNumberOfItemsVisible();
        var focusedItemPosition = this.carusel.state.currentIndex * this.itemSize;
        var focusedItemVisibleFrom = Math.max(0, focusedItemPosition - (itemsOnScreen * this.itemSize));
        var focusedItemVisibleTo = Math.min(this.carusel.props.data.length * this.itemSize, focusedItemPosition + (itemsOnScreen * this.itemSize));

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

    getSizeForItem() {
        if (!this.itemSize) {
            var itemClass = this.carusel.props.itemClass;
            this.itemSize = 0;
            this.itemSize += itemClass.styles[this.carusel.sizeProperty] || 0;
            this.itemSize += itemClass.styles['margin' + this.carusel.CSSNegativeProperty] || 0;
            this.itemSize += itemClass.styles['margin' + this.carusel.CSSPositiveProperty] || 0;
            this.itemSize += itemClass.styles['padding' + this.carusel.CSSNegativeProperty] || 0;
            this.itemSize += itemClass.styles['padding' + this.carusel.CSSPositiveProperty] || 0;
        }

        return this.itemSize;
    }

    getVisibleItems() {
        this.cachedItems = [];
        var itemClass = this.carusel.props.itemClass;

        for (var i = 0; i < this.carusel.props.data.length; i++) {
            var selected = (i === this.carusel.state.currentIndex)
            var dataItem = this.carusel.props.data[i];
            this.cachedItems.push(React.createElement(itemClass, {selected, index: i, key: dataItem.id + i, data: dataItem}));
        }

        return this.cachedItems;
    }
}

module.exports = DataScroller;