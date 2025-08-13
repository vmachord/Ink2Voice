You wake up in the middle of a dark forest. The air is cold, and the trees stretch endlessly around you.
* Follow the moonlit path -> PATH_MOON
* Venture into the dark woods -> PATH_DARK

=== PATH_MOON ===
You follow the path lit faintly by the moonlight. After a while, you reach a fork in the road.
* Take the path toward the cabin with a dim light -> CABIN
* Take the rocky trail leading uphill -> HILLTOP

=== PATH_DARK ===
You move deeper into the woods, where the branches seem to whisper. A shadow flickers in the distance.
* Call out to see if anyone is there -> VOICE
* Hide and wait quietly -> WATCHER

=== CABIN ===
You knock on the door. An old man opens and lets you in.
* Accept his offer to stay the night -> END_SAFE
* Refuse and continue walking -> END_WOLVES

=== HILLTOP ===
You reach the hilltop and see the entire forest below, shimmering under the moonlight.
Suddenly, you see a glowing stone on the ground.
* Pick up the glowing stone -> END_POWER
* Leave it untouched and head down -> END_ESCAPE

=== VOICE ===
A soft voice responds, beckoning you deeper.
You follow, but realize too late it's not human.
* Try to run away -> END_LOST
* Stand your ground -> END_ECHO

=== WATCHER ===
A creature passes close to your hiding place, but doesn’t see you.
Once it's gone, you escape the woods safely.
-> END_FREEDOM

=== END_SAFE ===
You stay in the cabin. The old man shares stories by the fire. You find peace. THE END.
->DONE

=== END_WOLVES ===
Wolves surround you as you leave the cabin area. You didn’t survive. THE END.
->DONE

=== END_POWER ===
You touch the glowing stone and feel immense power. But your body fades away. THE END.
->DONE

=== END_ESCAPE ===
You head down the hill and find a road leading out of the forest. You are free. THE END.
->DONE

=== END_LOST ===
You get lost following the voice and are never seen again. THE END.
->DONE

=== END_ECHO ===
The voice laughs. You’ve become part of the forest whispers. THE END.
->DONE

=== END_FREEDOM ===
You make it out of the forest as dawn breaks. A new day begins. THE END.
->DONE