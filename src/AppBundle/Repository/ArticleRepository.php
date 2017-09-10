<?php

namespace AppBundle\Repository;

use Doctrine\ORM\EntityRepository;

/**
 * Class ArticleRepository
 * @package AppBundle\Repository
 */
class ArticleRepository extends EntityRepository
{
    public function getArticles(int $lastNewsDate, int $limit)
    {
        $lastNewsDateTime = new \Datetime();
        $lastNewsDateTime->setTimestamp($lastNewsDate);

        $qb = $this->createQueryBuilder('b')
            ->where('b.createdAt < :lastNewsDate')
            ->setParameter('lastNewsDate', $lastNewsDateTime)
            ->orderBy('b.createdAt', 'DESC')
            ->getQuery()
            ->setMaxResults($limit);

        return $qb;
    }
}
