---
title: How to solve ghost collision problems in Unity3D
description: A quick guide on how to solve ghost collision problems in Unity3D
pubDate: "2022-12-22"
tags: ["Unity3D", "GameDev", "Physics"]
---

## Background story

For a class I'm taking, I'm currently making a mini golf game using Unity. Like any minigolf game, we have a ball that will roll on different surfaces. However, sometimes doing so can cause the ball to be ejected from the surface it's on. This bug, common to many physics engines, is called a ghost collision. I'll explain what it is and how I solved it.

## What is a ghost collision?

Ghost collisions, also called Speculative contacts, are when a physics engine thinks that two objects are colliding, but they're not. This is because the physics engine is trying to predict where the objects will be in the future, and if it thinks they'll be colliding, it will make them collide. This is a problem because it can cause objects to be ejected from the surface they're on, which is not what we want. This is especially the case with the Unity physics engine, which tends to have rather "bouncy" physics when it comes to collisions due to the way it handles penetration recovery.
![ghost collision](https://docs.unity3d.com/uploads/Main/SpeculativeCCD5.gif)
To solve this problem, we can use a few different methods:

## Solution 1 : Use a different physics engine

Starting in Unity 2019, Unity has a new physics engine available called **Havok Physics**. This physics engine is used in many AAA games, and is known for its stability and accuracy. It's available for free as an experimental package which is not compatible with regular Unity physics components and requires the conversion of your GameObjects into "entities" based on Unity’s DOTS technology. Havok Physics for Unity version 1.0.0 ([link](https://docs.unity3d.com/Packages/com.havok.physics@1.0/manual/index.html)) does not need to use the script "Convert to Entity" but the main caveat is that only Pro, Enterprise and UIC Unity users have access to this Havok version at runtime.

This meant that Havok was a pretty bad option for me, so I had to find another solution.

## Solution 2 : Make the ball bigger

Unity's collisions work better with bigger objects, this was however annoying for me as it would mess up the scale of my game and it would make the physics feel more "heavy".

## Solution 3 : The best and simplest solution

Finally, after a lot of research, I found a simple solution that worked for me. This solution simply consists of lowering the ["Default Contact Offset"](https://docs.unity3d.com/ScriptReference/Physics-defaultContactOffset.html) value in the Physics page of Project Settings. This is, however, not guaranteed to be a silver bullet since it depends a lot on the size of your objects.
