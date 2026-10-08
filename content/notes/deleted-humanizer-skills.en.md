On October 8 I deleted 4 skills, 36 files, and a writing spec of about a hundred lines from my writing project. What is left about writing now fits in a dozen lines.

I had been collecting these since late August, about six weeks. The reason for deleting them is simple: they never fixed the problem I installed them for, and that problem later went away when I changed models.

## Why I installed them

I started out writing my Chinese drafts with Codex, Kimi and DeepSeek. You could tell at a glance that an AI wrote them.

So I went looking on GitHub. I installed a third-party writing skill that teaches the model to sound like a person and ships with a script that checks the draft. Then I built my own article-writing skill around it, with 7 reference documents and 2 audit scripts.

The rules kept growing. They ended up in four places and contradicted each other. On October 7 I merged them into one spec: no warm-up openings, fewer "not X but Y" sentences, fewer dashes and parallel lists, no neat closing line for every section, plus a list of banned words.

## What happened

It didn't work. The AI tone stayed.

My spec explicitly banned rallying parallelism and grand, sweeping conclusions. The article would still end with something like: *"In the wave of technology, we must not only... but also... Let's wait and see."* However dense the rules got, the model found another way to do the same thing.

My numbers did not reward the spec either. Most posts written under those rules reached about the same small audience. The only one that took off was written before the spec existed.

## What made me decide

Then I switched models and found that Opus 5.5 and Gemini 3.8 Flash already write Chinese well. The model is strong enough by itself, without skills and without style rules.

Looking back at those 36 files, it was clear what they were: patches for models that were not good enough at the time. The patches never fit well (maybe I was using them wrong?), the models keep getting replaced, and what remained was maintenance. Read the spec before every draft. Keep the rules consistent with each other. Go through every warning from the script.

Most of all, a skill should add a capability. If the model already writes well, the skill and the markdown rules become dead weight.

So I didn't prune. I deleted everything.

## The most famous one, and why I don't recommend it right now

You can't talk about "de-AI" skills without Humanizer on GitHub. In October 2026 it has more than 50,000 stars, and its Chinese port, Humanizer-zh, has 19,000. The Chinese writing skill I installed borrowed its categories from that port.

It works from a checklist of symptoms. The original has 26 patterns, drawn from what Wikipedia editors wrote up as signs of AI writing: "not X but Y", forced lists of three, a punchy line at the end of each paragraph, bold used as decoration, a set of overused words. The model checks the draft against the list, rewrites, and checks again.

I knew that list well. The things my own spec banned map onto it almost one to one. I had effectively copied the same checklist into Chinese, and I got the same result.

Four reasons I don't recommend it at this stage:

1. **The list records the flaws of the previous generation of models.** It was compiled from the AI text of its time. After a model change the old flaws fade, and the list has no idea whether the new model has new ones. Using it on a new model means chasing problems that have already passed.
2. **It only fixes the surface.** You can check sentence patterns and word choice one by one, but a piece usually reads as AI-written because everything in it is something everyone already knows. However clean the sentences get, they cannot add firsthand experience.
3. **Its author doesn't promise much either.** The project says plainly that its goal is not to beat AI detectors, and that most rewritten text will still be flagged.
4. **It adds process cost.** Every draft takes one or two more passes of checking and rewriting. When the model already writes well enough, that step buys very little.

It still has uses. With a cheaper or older model, or when rewriting text in bulk, the list catches the most obvious problems. What I don't recommend is this: you already have the best model, you are writing about your own work, and you still wrap one more layer around it.

## What I kept

After the cleanup, the part of my project instructions about writing is a dozen lines, all things no model could guess:

- Who I write for.
- Two rules of my own: only years and numbers in the body, sources at the end; never invent tests or experiences I didn't have.
- A few things my readership data taught me.
- Delivery steps: where drafts go and which layout to use.

Nothing about tone, structure, titles or length.

## What this did not fix

Deleting the spec removed a useless layer. It does not make my writing better by itself.

My data says prose was never the bottleneck. The posts that went nowhere were written well enough. Their problem was that they retold someone else's article, mostly from newsletters, on topics dozens of others were covering at the same time. Rules can't fix that, and a better model can't either. Only doing and testing things myself can. This post is the first one written that way.

From here on I write with no spec. When the numbers come in I'll report back: better, worse, or no difference.

## If you have a pile of rules too

Back when it was GPT-5.4, I think, I added a pile of harness rules, ADR docs and the superpowers plugin to my projects. As the vendors' own harnesses and the models improved, I have trimmed most of it away.

One kind of rule should stay: what the model cannot possibly know. What the project is, who it is for, which directory the work is limited to, your own hard requirements such as the project's port. Those are not patches. They stay no matter how many model generations go by.

## What I'll write next

I'm done chasing AI news. From now on I only write about things I did myself, mostly hands-on multi-agent work: how I split the tasks, how the agents work together, where it breaks, what it costs.

Which rules have you deleted that turned out to be unnecessary? Tell me on X: @dceniac.
