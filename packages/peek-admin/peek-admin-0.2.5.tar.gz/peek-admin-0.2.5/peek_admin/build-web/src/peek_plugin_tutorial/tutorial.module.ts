import {CommonModule} from "@angular/common";
import {NgModule} from "@angular/core";
import {Routes, RouterModule} from "@angular/router";

// Import our components
import {TutorialComponent} from "./tutorial.component";

// Define the routes for this Angular module
export const pluginRoutes: Routes = [
    {
        path: '',
        component: TutorialComponent
    }

];

// Define the module
@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(pluginRoutes)],
    exports: [],
    providers: [],
    declarations: [TutorialComponent]
})
export class TutorialModule {

}

