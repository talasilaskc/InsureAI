import { Component } from '@angular/core';
import { RouterOutlet } from "@angular/router";
import { Sidebar } from "../../components/sidebar/sidebar";
import { Navbar } from "../../components/navbar/navbar";

@Component({
  selector: 'app-company-layout',
  standalone: true,
  imports: [RouterOutlet, Sidebar, Navbar],
  templateUrl: './company-layout.html',
  styleUrl: './company-layout.css',
})
export class CompanyLayout {

}
