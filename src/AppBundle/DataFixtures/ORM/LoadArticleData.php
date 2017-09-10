<?php

namespace AppBundle\DataFixtures\ORM;

use AppBundle\Entity\Article;
use Doctrine\Common\DataFixtures\AbstractFixture;
use Doctrine\Common\DataFixtures\OrderedFixtureInterface;
use Doctrine\Common\Persistence\ObjectManager;

/**
 * Class LoadArticleData
 * @package AppBundle\DataFixtures\ORM
 *
 *
 * @codeCoverageIgnore
 */
class LoadArticleData  extends AbstractFixture implements OrderedFixtureInterface
{
    /**
     * @param ObjectManager $manager
     *
     * @return void
     */
    public function load(ObjectManager $manager): void
    {
        foreach ($this->getData() as $data) {
            $article = new Article();
            $article->setTitle($data['title']);
            $article->setCreatedAt($data['created_at']);

            $manager->persist($article);
        }

        $manager->flush();
        $manager->clear();
    }

    /**
     * @return int
     */
    public function getOrder(): int
    {
        return 1;
    }

    /**
     * @return array
     */
    private function getData(): array
    {
        return [
            ['title' => 'MIGRER UNE APPLICATION REACT CLIENT-SIDE EN SERVER-SIDE AVEC NEXT.JS', 'created_at' => new \DateTime('03-09-2017')],
            ['title' => 'VOTRE CI DE QUALITÉ', 'created_at' => new \DateTime('30-08-2017')],
            ['title' => 'JSON SERVER', 'created_at' => new \DateTime('25-08-2017')],
            ['title' => 'BUILD AN API WITH API PLATFORM', 'created_at' => new \DateTime('24-08-2017')],
            ['title' => 'RETOUR SUR UN LIVE-CODING DE DÉCOUVERTE DU LANGAGE GO', 'created_at' => new \DateTime('23-08-2017')],
            ['title' => 'FEEDBACK ON A LIVE-CODING TO DISCOVER GO LANGUAGE', 'created_at' => new \DateTime('23-08-2017')],
            ['title' => 'HOW TO CHECK THE SPELLING OF YOUR DOCS FROM TRAVIS CI?', 'created_at' => new \DateTime('18-08-2017')],
            ['title' => 'COMMENT VÉRIFIER L\'ORTHOGRAPHE DE VOS DOCS DEPUIS TRAVIS CI ?', 'created_at' => new \DateTime('18-08-2017')],
            ['title' => 'JSON SERVER', 'created_at' => new \DateTime('16-08-2017')],
            ['title' => 'ANDROID ET LES DESIGN PATTERNS', 'created_at' => new \DateTime('09-08-2017')],
            ['title' => 'CONTINUOUS IMPROVEMENT: HOW TO RUN YOUR AGILE RETROSPECTIVE?', 'created_at' => new \DateTime('03-08-2017')],
            ['title' => 'CONSTRUIRE UNE API EN GO', 'created_at' => new \DateTime('26-07-2017')],
            ['title' => 'CRÉER UNE API AVEC API PLATFORM', 'created_at' => new \DateTime('25-07-2017')],
            ['title' => 'LES PRINCIPAUX FORMATS DE FLUX VIDEO LIVE DASH ET HLS', 'created_at' => new \DateTime('19-07-2017')],
            ['title' => 'MIGRATION DU BLOG', 'created_at' => new \DateTime('11-07-2017')],
            ['title' => 'TAKE CARE OF YOUR EMAILS', 'created_at' => new \DateTime('05-07-2017')],
            ['title' => 'ENVOYER DES PUSH NOTIFICATIONS VIA AMAZON SNS EN SWIFT 3', 'created_at' => new \DateTime('28-06-2017')],
            ['title' => 'CONSTRUCT AND STRUCTURE A GO GRAPHQL API', 'created_at' => new \DateTime('15-06-2017')],
            ['title' => 'IS AMP THE WEB 3.0', 'created_at' => new \DateTime('14-06-2017')],
            ['title' => 'CONSTRUIRE ET STRUCTURER UNE API GRAPHQL EN GO', 'created_at' => new \DateTime('07-06-2017')],
        ];
    }
}
