<?php
    ini_set('display_errors', 1);
    ini_set('display_starup_error', 1);
    error_reporting(E_ALL);

    require_once '../vendor/autoload.php';
    
    use Illuminate\Database\Capsule\Manager as Capsule;
    use Aura\Router\RouterContainer;

    $capsule = new Capsule;

    $capsule->addConnection([

        'driver'    => 'mysql',
        'host'      => 'localhost',
        'database'  => 'database',
        'username'  => 'root',
        'password'  => 'password',
        'charset'   => 'utf8',
        'collation' => 'utf8_unicode_ci',
        'prefix'    => '',
    ]);

    $capsule->setAsGlobal();
    $capsule->bootEloquent();
    //I'm not using capsule right now, but is installed for the future

    //Get the HTTP request using the PSR7 standar
    $request = Laminas\Diactoros\ServerRequestFactory::fromGlobals(
        
        $_SERVER,
        $_GET,
        $_POST,
        $_COOKIE,
        $_FILES
    );

    $routerContainer = new RouterContainer();
    $map = $routerContainer->getMap();
    $map->get('index','/',[

        'controller' => 'App\Controllers\IndexController',
        'action' => 'homeAction'
    ]);
    $map->get('sources','/sources',[

        'controller' => 'App\Controllers\IndexController',
        'action' => 'sourcesAction'
    ]);
    $map->get('about','/about',[
        
        'controller' => 'App\Controllers\IndexController',
        'action' => 'aboutAction'
    ]);

    $matcher = $routerContainer->getMatcher();
    $route = $matcher->match($request);

    if(!$route){

        $controllerName = 'App\Controllers\IndexController';

        $controller = new $controllerName;
        $response = $controller->noRouteAction();
    }else{
        
        $handlerData = $route->handler;
        $controllerName = $handlerData['controller'];
        $actionName = $handlerData['action'];

        $controller = new $controllerName;
        $response = $controller->$actionName();
    }

    echo $response->getBody();