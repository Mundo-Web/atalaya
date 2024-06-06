<?php

use App\Models\Status;

class Router
{
  const components = [
    'login' => [
      'component' => 'Login.jsx'
    ],
    'home' => [
      'component' => 'Home.jsx',
      'adminto-instance' => true
    ],
    'clients' => [
      'component' => 'Clients.jsx',
      'adminto-instance' => true
    ],
    'projects' => [
      'component' => 'Projects.jsx',
      'adminto-instance' => true,
      'compact' => [
        'statuses' => Status::class
      ]
    ],
    'types' => [
      'component' => 'Types.jsx',
      'adminto-instance' => true
    ],
    'statuses' => [
      'component' => 'Statuses.jsx',
      'adminto-instance' => true
    ],
    'users' => [
      'component' => 'Users.jsx',
      'adminto-instance' => true
    ]
  ];
}
