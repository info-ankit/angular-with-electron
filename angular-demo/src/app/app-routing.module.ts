import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DesktopCapturerComponent } from './desktop-capturer/desktop-capturer.component';

const routes: Routes = [
	{ path: 'desktop-capturer', component: DesktopCapturerComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
