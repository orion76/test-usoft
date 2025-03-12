import { NgClass } from "@angular/common";
import { Component, computed, input, model, OnInit, ViewEncapsulation } from "@angular/core";

type PagerPlaces = 'left' | 'center' | 'right';

function arrayRange(start: number, stop: number): number[] {
    const length = (stop - start) + 1;
    return Array.from(
        { length },
        (_, index) => start + index
    );

}

function getPagerPlace(currentPage: number, pagesCount: number, diff: number): PagerPlaces {

    if (currentPage <= diff) {
        return 'left'
    }
    if (currentPage >= (pagesCount - diff)) {
        return 'right'
    }
    return 'center';
}



@Component({
    selector: 'list-paginator',
    template: `
    @if(arrowButtonVisible()){
        <button class="button button-back" (click)="shiftPage(-1)" [disabled]="backButtonDisabled()">{{TEXT_BACK}}</button>
    }
    <div class="buttons">
        @if(firstButtonVisible()){
            <button class="button button-first" (click)="selectPage(1)">{{TEXT_PAGE_FIRST}}</button>
        }

        @if(leftEllipsisVisible()){
            <div class="ellipsis">{{TEXT_ELLIPSIS}}</div>
        }
  
        @for(pn of buttons(); track pn){
            <button class="button button-select-page" [ngClass]="{'active-page':isCurrentPage(pn)}" (click)="selectPage(pn)">{{pn}}</button>
        }
    
        @if(rightEllipsisVisible()){
            <div class="ellipsis">{{TEXT_ELLIPSIS}}</div>
        }
     
        @if (lastButtonVisible()) {
            <button class="button button-last" (click)="selectPage(pageLast())">{{pagesCount()}}</button>
        }
    </div>
    @if(arrowButtonVisible()){
        <button class="button button-forvard" (click)="shiftPage(1)" [disabled]="forwardButtonDisabled()">{{TEXT_FORFARD}}</button>
    }
    `,
    styleUrl: 'paginator.component.scss',
    host: {
        'class': 'list-paginator'
    },

    imports: [NgClass],
    encapsulation: ViewEncapsulation.None
})
export class PaginatorComponent implements OnInit {
    TEXT_BACK = '<';
    TEXT_FORFARD = '>';
    TEXT_ELLIPSIS = '...';
    TEXT_PAGE_FIRST = '1';
    BUTTONS_COUNT = 5;

    pagesCount = input<number>(0)
    currentPage = model<number>(1);

    pageLast = computed(() => this.pagesCount() > (this.BUTTONS_COUNT + 2) ? this.pagesCount() : 0);

    buttons = computed<number[]>(() => {
        const { BUTTONS_COUNT } = this;

        const currentPage = this.currentPage();
        const pagesCount = this.pagesCount();
        const diff = Math.floor(BUTTONS_COUNT / 2);


        const place = getPagerPlace(currentPage, pagesCount, diff);

        if (place === 'left') {
            const buttonsCount = Math.min(pagesCount, BUTTONS_COUNT);
            return arrayRange(1, buttonsCount);
        }

        if (place === 'right') {
            return arrayRange(pagesCount - this.BUTTONS_COUNT, pagesCount);
        }

        return arrayRange(currentPage - diff, currentPage + diff);
    })

    firstButton = computed(() => this.buttons()[0]);
    lastButton = computed(() => this.buttons()[this.buttons().length - 1]);


    leftEllipsisVisible = computed(() => this.firstButton() > 2);
    rightEllipsisVisible = computed(() => (this.pagesCount() - this.lastButton()) > 0);


    firstButtonVisible = computed(() => this.firstButton() > 1);
    lastButtonVisible = computed(() => this.lastButton() < this.pagesCount());


    backButtonDisabled = computed(() => this.currentPage() === 1);
    forwardButtonDisabled = computed(() => this.currentPage() >= this.pagesCount());

    arrowButtonVisible = computed(() => this.buttons().length > 0);

    selectPage(pageNumber: number) {
        this.currentPage.set(pageNumber);
    }
    shiftPage(direction: 1 | -1) {
        this.currentPage.update(curr => curr + direction)
    }
    ngOnInit() {

    }
    isCurrentPage(pageNumber: number): boolean {
        return this.currentPage() === pageNumber
    }
}