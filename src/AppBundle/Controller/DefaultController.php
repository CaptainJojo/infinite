<?php

namespace AppBundle\Controller;

use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\JsonResponse;
use AppBundle\Entity\Article;

class DefaultController extends Controller
{
    /**
     * @Route("/", name="homepage")
     */
    public function indexAction(Request $request)
    {
        $articles = $this->getDoctrine()
            ->getRepository(Article::class)
            ->getArticles(time(), 3)
            ->getResult();

        $jsonArticles = [];
        foreach ($articles as $article) {
            $jsonArticles[] = [
                'id' => $article->getId(),
                'title' => $article->getTitle(),
                'createdAt' => $article->getCreatedAt()->getTimestamp()
            ];
        }

        return $this->render('default/index.html.twig', [
            'latestNews' => $jsonArticles,
            'lastItemDate' => $jsonArticles[count($jsonArticles) - 1]['createdAt']
        ]);
    }

    /**
     * @Route("/ws", name="ws")
     */
    public function wsAction(Request $request)
    {
        $lastItemDate = (int) ($request->get('last_item_date') ?? time());
        $articles = $this->getDoctrine()
            ->getRepository(Article::class)
            ->getArticles($lastItemDate, 3)
            ->getResult();

        $jsonArticles = [];
        foreach ($articles as $article) {
            $jsonArticles[] = [
                'id' => $article->getId(),
                'title' => $article->getTitle(),
                'createdAt' => $article->getCreatedAt()->getTimestamp()
            ];
        }

        return new JsonResponse($jsonArticles);
    }
}
