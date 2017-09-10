<?php

namespace AppBundle\Service\VersionStrategy;

use Symfony\Component\Asset\VersionStrategy\VersionStrategyInterface;

class JavascriptBusterVersionStrategy implements VersionStrategyInterface
{
    /**
     * The manifest object containing for each entry
     * the filename containing the version.
     *
     * @var array
     */
    private $hashes = [];

    /**
     * The manifest file path.
     *
     * @var string
     */
    private $path;

    /**
     * @param string $path The manifest file path
     */
    public function __construct(string $path)
    {
        $this->path = $path;
    }

    /**
     * {@inheritdoc}
     */
    public function getVersion($asset): string
    {
        $this->ensureHashesLoaded();

        preg_match(
            // Matches pattern like 'vendor.67e29947398bcbf9b383.js'
            '/(?:.*)\.([[:alnum:]]*)\.js/',
            $this->hashes[$this->getEntryName($asset)] ?? '',
            $matches
        );

        return $matches[1] ?? '';
    }

    /**
     * {@inheritdoc}
     */
    public function applyVersion($asset): string
    {
        $this->ensureHashesLoaded();

        return $this->hashes[$this->getEntryName($asset)] ?? '';
    }

    /**
     * Return the manifest entry name for the given asset.
     *
     * @return string
     */
    private function getEntryName($path): string
    {
        // Replace pattern like 'vendor.js' into 'vendor'
        return preg_replace(
            '/(.*)\.js/',
            '$1',
            $path
        );
    }

    /**
     * Load hashes from manifest if needed.
     */
    private function ensureHashesLoaded()
    {
        if (empty($this->hashes)) {
            $this->hashes = json_decode(file_get_contents($this->path), true);
        }
    }
}
