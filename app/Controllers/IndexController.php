<?php

namespace App\Controllers;

use App\Models\Section;

class IndexController extends BaseController{

    public $DATES = [

        'LAST_DATA_UPDATE' => "2020-02-24",
        'COPY_DATE' => "2020"
    ];

    public function homeAction(){

        $title = ' - Home';

        return $this->renderHTML('section-home.twig', [
            'title' => $title,
            'lastUpdate' => $this->DATES['LAST_DATA_UPDATE'],
            'copy' => $this->DATES['COPY_DATE']
        ]);
    }

    public function aboutAction(){

        $title = ' - About';

        return $this->renderHTML('section-about.twig', [
            'title' => $title,
            'lastUpdate' => $this->DATES['LAST_DATA_UPDATE'],
            'copy' => $this->DATES['COPY_DATE']
        ]);
    }

    public function sourcesAction(){

        $title = ' - Sources';

        return $this->renderHTML('section-sources.twig', [
            'title' => $title,
            'lastUpdate' => $this->DATES['LAST_DATA_UPDATE'],
            'copy' => $this->DATES['COPY_DATE']
        ]);
    }

    public function noRouteAction(){

        $title = ' - Error 404';
        
        return $this->renderHTML('section-404.twig', [
            'title' => $title,
            'lastUpdate' => $this->DATES['LAST_DATA_UPDATE'],
            'copy' => $this->DATES['COPY_DATE']
        ]);
    }
}