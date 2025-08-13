You awaken at the edge of the ancient Singing Forest. A faint melody hums in the trees.

* Follow the melody deeper into the forest -> PATH_MELODY
* Climb a tree to get a better view -> PATH_TREE

=== PATH_MELODY ===
As you walk, a woman in green appears.
Lira: Welcome, traveler. The forest has been waiting for you.
* Ask who she is -> LIRA_INTRO
* Stay silent and observe -> LIRA_SILENT

=== PATH_TREE ===
You climb a tall tree and spot a clearing with a glowing light.
Suddenly, a voice calls from below.
Taron: That’s dangerous. Come down now.
* Climb down and speak to him -> TALK_TARON
* Ignore him and keep watching -> FALL

=== LIRA_INTRO ===
Lira: I am the voice of the woods. The Heart of the Forest is dying. Will you help us?
* Agree to help -> TASK_START
* Refuse and walk away -> END_WALK

=== LIRA_SILENT ===
Lira: Silence is wise... but time is short.
* Ask what she means -> TASK_START
* Walk away -> END_WALK

=== TALK_TARON ===
Taron: The glow you saw is the Heartstone. It must not fall into the wrong hands.
* Ask how to reach it -> TASK_START
* Say it’s not your problem -> END_WALK

=== FALL ===
Your foot slips and you fall. Darkness takes you.
THE END.
->DONE

=== TASK_START ===
Lira: You must choose the path.
Taron: One path leads to light, the other to ruin.

* Follow Lira through the river path -> RIVER_PATH
* Follow Taron through the mountain trail -> MOUNTAIN_PATH

=== RIVER_PATH ===
You cross stepping stones and hear whispers from the water.

* Listen closely -> WATER_TRUTH
* Block your ears and keep walking -> END_MADNESS

=== MOUNTAIN_PATH ===
The trail is steep and stormy. Rocks tumble around you.

* Take shelter in a cave -> CAVE
* Push forward -> END_FALL_ROCK

=== WATER_TRUTH ===
The water speaks truth. You see visions of the forest’s past.
You understand your purpose.

* Take the Heartstone hidden in the river -> END_SACRIFICE
* Leave it for the forest to guard -> END_RESTORED

=== CAVE ===
Inside the cave, strange glyphs glow.

* Touch the glyphs -> END_POWER
* Wait until the storm passes -> END_RESTORED

=== END_WALK ===
You walk away from the forest. The melody fades. The forest’s fate remains unknown.
THE END.
->DONE

=== END_MADNESS ===
Blocking the whispers makes you vulnerable. Shadows consume you.
THE END.
->DONE

=== END_FALL_ROCK ===
A large rock falls and blocks the path. You turn back, never to return.
THE END.
->DONE

=== END_SACRIFICE ===
As you lift the Heartstone, your energy flows into it.
The forest is healed, but you vanish.
THE END.
->DONE

=== END_RESTORED ===
By leaving the Heartstone untouched, harmony returns. The forest thanks you.
THE END.
->DONE

=== END_POWER ===
The glyphs imbue you with ancient power, but the cost is your voice—now part of the forest.
THE END.
->DONE
