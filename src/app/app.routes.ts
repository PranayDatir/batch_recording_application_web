import { Routes } from '@angular/router';
import { Login } from './pages/login/login';
import { Layout } from './pages/layout/layout';
import { Batches } from './pages/batches/batches';
import { Candidate } from './pages/candidate/candidate';
import { authGuard } from './core/guards/auth-guard';
import { BatchEnrollments } from './pages/batch-enrollments/batch-enrollments';

export const routes: Routes = [
    { path: '', redirectTo: 'login', pathMatch: 'full' },
    { path: 'login', component: Login, title: 'Login' },
    {
        path: 'layout',
        component: Layout,
        children: [
            { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
            { path: 'batches', component: Batches, pathMatch: 'full' },
            { path: 'candidate', component: Candidate, pathMatch: 'full' },
            { path: 'batchEnrollments', component: BatchEnrollments, pathMatch: 'full' },
            { path: 'batchSessions', component: BatchEnrollments, pathMatch: 'full' },
        ],
        canActivate: [authGuard]
    }
];
