import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CollaborePage } from './collabore.page';

const routes: Routes = [
  {
    path: 'tabs',
    component: CollaborePage,
    children: [
      {
        path: 'posts',
        children: [
          {
            path: '',
            loadChildren: () => import('./posts/posts.module').then(m => m.PostsPageModule)
          },
          {
            path: ':postId',
            loadChildren: () => import('./posts/posts.module').then(m => m.PostsPageModule)
          },
    
        ]
      },
      {
        path: 'new-post',
        children: [
          {
            path: '',
            loadChildren: () => import('./new-post/new-post.module').then(m => m.NewPostPageModule)
          }
        ]

      },
      {
        path: 'profile',
        children: [
          {
            path: '',
            loadChildren: () => import('./profile/profile.module').then(m => m.ProfilePageModule)
          },
          {
            path: 'edit',
            loadChildren: () => import('./profile/edit-profile/edit-profile.module').then(m => m.EditProfilePageModule)
          }
        ]
      },
      {
        path: '',
        redirectTo: '/collabore/tabs/posts',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '',
    redirectTo: '/collabore/tabs/posts',
    pathMatch: 'full'
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CollaborePageRoutingModule {}
