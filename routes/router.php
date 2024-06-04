<?php

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
    'users' => [
      'component' => 'Users.jsx',
      'adminto-instance' => true
    ]
  ];
}
