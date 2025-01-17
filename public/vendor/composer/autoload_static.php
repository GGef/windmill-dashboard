<?php

// autoload_static.php @generated by Composer

namespace Composer\Autoload;

class ComposerStaticInitaa8ad3d3fc7debb078ff332a1a8f27dc
{
    public static $prefixLengthsPsr4 = array (
        'a' => 
        array (
            'app\\' => 4,
        ),
    );

    public static $prefixDirsPsr4 = array (
        'app\\' => 
        array (
            0 => __DIR__ . '/../..' . '/app',
        ),
    );

    public static $classMap = array (
        'Composer\\InstalledVersions' => __DIR__ . '/..' . '/composer/InstalledVersions.php',
    );

    public static function getInitializer(ClassLoader $loader)
    {
        return \Closure::bind(function () use ($loader) {
            $loader->prefixLengthsPsr4 = ComposerStaticInitaa8ad3d3fc7debb078ff332a1a8f27dc::$prefixLengthsPsr4;
            $loader->prefixDirsPsr4 = ComposerStaticInitaa8ad3d3fc7debb078ff332a1a8f27dc::$prefixDirsPsr4;
            $loader->classMap = ComposerStaticInitaa8ad3d3fc7debb078ff332a1a8f27dc::$classMap;

        }, null, ClassLoader::class);
    }
}
