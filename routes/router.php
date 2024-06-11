<?php

use App\Models\Status;

use function PHPSTORM_META\map;

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
        'statuses' => [
          'class' => Status::class,
          'filter' => [
            'table_id' => 'projects',
            'status' => true
          ]
        ]
      ]
    ],
    'leads' => [
      'component' => 'Leads.jsx',
      'adminto-instance' => true
    ],
    'types' => [
      'component' => 'Types.jsx',
      'adminto-instance' => true
    ],
    'tables' => [
      'component' => 'Tables.jsx',
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
