import { DOCUMENT } from "@angular/common";
import { Inject, Injectable } from "@angular/core";


@Injectable({ providedIn: 'root' })
export class ThemesService {

    public constructor(@Inject(DOCUMENT) private document : Document) {} 

    // public loadTheme(themeName : string) : void {
    //     console.log('Theme service called...');
    //     const head = this.document.getElementsByTagName('head')[0];
    //     const themeSrc = this.document.getElementById('client-theme') as HTMLLinkElement;
    //     console.log('ThemeSrc: ' , themeSrc);
        
    //     if (themeSrc) {
    //         themeSrc.href = `${themeName}.scss`;
    //     } else {
    //         const style = this.document.createElement('link');
    //         style.id = 'client-theme';
    //         style.rel = 'stylesheet';
    //         style.type = "text/scss";
    //         style.href = `${themeName}.scss`;
    //         head.appendChild(style);
    //         console.log(head);
    //     }
    // }

    public changeTheme(themeName : string) : void {
        this.document.body.setAttribute('data-theme', 
        themeName);

    }
}