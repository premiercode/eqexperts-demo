# Equipment Experts: homepage design preview

Design preview prepared by Premier Code Inc.

Preview URL: https://eqexperts-demo.premiercodeinc.com

Three homepage directions for Equipment Experts (Ringling, Oklahoma). Switch between them with the Option A / B / C control fixed to the bottom-left of every page. Nothing on these pages is functional: the forms send nothing and the video is sample stock footage.

| Option | Concept | Link |
|---|---|---|
| Option A | "Diamond & Steel": a restrained diamond-pattern language set into a modern industrial grid, in charcoal, steel, red clay and the logo's orange and blue | [/option-a/](https://eqexperts-demo.premiercodeinc.com/option-a/) |
| Option B | "Red Dirt Iron": bold and cinematic, with a full-bleed tractor-at-sunset video, huge condensed type and big machinery photography | [/option-b/](https://eqexperts-demo.premiercodeinc.com/option-b/) |
| Option C | "Field Report": editorial and print-inspired, with cream paper, a serif masthead, a typewriter "report ticket" and stamped credential tags | [/option-c/](https://eqexperts-demo.premiercodeinc.com/option-c/) |

Photo and video credits: [credits.html](credits.html). Most photos are royalty-free stock from Pexels.

## Placeholders needing client confirmation

Each placeholder is marked `<!-- PLACEHOLDER -->` in the page source.

| Item | Where |
|---|---|
| Business hours (shown as "by appointment") | A, B, C contact sections |
| The appraiser's name next to the ASAA credential (currently "your appraiser") | A, B, C credentials |
| "How it works" / "How a report comes together" process steps (labeled Sample) | A, C |
| reCAPTCHA v3 script and token field for the request form | A, B, C forms |
| Rights to the two client photos (excavator line, shop interior) | credits.html, A, B, C |

Also confirm with the client:
- the main phone number, (940) 395-7200
- the "thirty plus years" wording
- any wish to mention the owner's heritage on the site

## Remove at launch

- [ ] The option switcher: each block between `<!-- REMOVE AT LAUNCH: option switcher -->` and `<!-- /REMOVE AT LAUNCH -->`.
- [ ] The two unused options, and the root redirect in `index.html`.
- [ ] The "Design preview" bar and the "Sample" labels.
- [ ] `<meta name="robots" content="noindex, nofollow">` on every page.
- [ ] The `Disallow: /` block in `robots.txt`.
- [ ] Replace the preview forms with the real handler (reCAPTCHA v3, honeypot check, transactional email).
- [ ] Replace stock imagery with the client's own photos and video where possible.
