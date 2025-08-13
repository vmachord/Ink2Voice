You wake up in a strange land. A shadow moves in the distance.

* Call out -> CALL_OUT
* Stay hidden -> HIDE

=== CALL_OUT ===
A woman approaches.  
Aria: Who are you? Are you hurt?

* Ask for help -> ASK_HELP
* Stay silent -> STAY_SILENT

=== HIDE ===
You hide behind a tree.  
Kael: I saw you. No use hiding.

* Surrender -> SURRENDER
* Run -> RUN

=== ASK_HELP ===
Aria brings you to a village.  
Mira: We can give you shelter, but we must test your soul.

* Accept the test -> TEST
* Refuse -> END_REFUSE

=== STAY_SILENT ===
Aria frowns.  
Aria: If you won’t speak, I can’t help.

* Walk away -> END_LOST
* Follow her silently -> FOLLOW_ARIA

=== SURRENDER ===
Kael smiles.  
Kael: Brave. Come with me.

* Follow Kael -> FOLLOW_KAEL
* Refuse -> END_REFUSE

=== RUN ===
You trip and fall.  
END. THE END.
-> DONE

=== FOLLOW_ARIA ===
You follow Aria into the village.  
Mira: You have courage. Stay here.

* Accept her offer -> END_SHELTER
* Leave the village -> END_LOST

=== FOLLOW_KAEL ===
Kael shows you a hidden ruin.  
Kael: Touch the stone, claim your fate.

* Touch the stone -> END_POWER
* Walk away -> END_SAFE

=== TEST ===
You pass the test. The villagers cheer.  
Mira: You are one of us now.

* Stay forever -> END_SHELTER
* Leave in peace -> END_SAFE

=== END_SHELTER ===
You are safe and live a peaceful life. THE END.
-> DONE

=== END_LOST ===
You get lost in the wild and are never found. THE END.
-> DONE

=== END_POWER ===
You gain immense power but lose your humanity. THE END.
-> DONE

=== END_SAFE ===
You walk away and return to normal life. THE END.
-> DONE

=== END_REFUSE ===
You walk away into the unknown. THE END.
-> DONE
