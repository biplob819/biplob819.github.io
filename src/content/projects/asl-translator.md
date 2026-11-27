---
title: ASL Translator
tagline: A web app that turns American Sign Language into text and speech from a
  webcam, with hand tracking in the browser so video never leaves the device.
kind: case-study
status: shipped
role: Product and build
year: "2026"
order: 38
tags:
  - computer vision
  - accessibility
  - real-time ML
headline:
  value: 98.0%
  label: fingerspelling accuracy on the held-out test split (A to Z plus space,
    delete and nothing), target ≥95%
  note: "99.6% on a 1,300-sample golden set; 5-fold cross-validation 98.01% ±
    0.28%; worst class 94.0% (M). Inference missed its target: about 25 ms
    average against a <10 ms p95 target. The word model reaches 83.8% top-1 on
    250 signs, but its signer-independent accuracy is N/A: the dataset has no
    participant IDs, so it was never tested on unseen signers. Its top-5 and
    worst-class accuracy are not measured. Accuracy figures come from offline
    test sets; no accuracy from live webcam use is published."
metrics:
  - value: 83.8%
    label: word top-1 on 250 signs, target ≥80%; not tested on unseen signers
  - value: ~25 ms
    label: fingerspelling inference, average; target <10 ms p95, missed
  - value: 0.42 ms
    label: word inference, mean (target <50 ms p95); 114.8 KB ONNX model
  - value: 83 of 84
    label: backend tests passing, 1 skipped (the word golden set is not in the
      repo)
links:
  repo: https://github.com/biplob819/asl-translator
  prd: https://github.com/biplob819/asl-translator/blob/master/features.md
  techspec: https://github.com/biplob819/asl-translator/blob/master/spec.md
  report: https://github.com/biplob819/asl-translator/blob/master/metrics.md
  architecture: https://github.com/biplob819/asl-translator/blob/master/spec.md#4-system-architecture
  dataflow: https://github.com/biplob819/asl-translator/blob/master/permissions.md#2-data-flow-security
stack:
  - MediaPipe Tasks Vision (in the browser)
  - FastAPI
  - PyTorch to ONNX Runtime
  - scikit-learn
  - Next.js and TypeScript
  - Web Speech API
  - SQLite with SQLAlchemy
  - Docker Compose
methodology:
  - "Fingerspelling: MediaPipe hand landmarks extracted offline from the Kaggle
    ASL Alphabet images (20,007 samples, 1,000 per class sampled), centred on
    the wrist and scaled by the hand's bounding box; a Random Forest with 100
    estimators on 63 features, a stratified 80/20 split and 5-fold
    cross-validation"
  - "Words: PopSign ASL v1.0 in its gislr-mean-agg form, 137,078 sequences of 10
    mean frames; 75 hand and pose landmarks (225 features a frame, face
    dropped), z-score normalised on the training set; a 2-layer bidirectional
    LSTM (128 hidden) with additive attention, early stopping (patience 10) and
    a stratified 80/20 split, exported to ONNX"
  - The dataset has no participant IDs, so the word split could not keep
    signers apart; signer-independent accuracy is reported as N/A, not
    estimated
  - Training imports the same normalisation function the server uses at
    inference, with a matching TypeScript version in the browser
  - "An eval suite scores accuracy, per-class accuracy, a confusion matrix and
    p50/p95/p99 latency for both models; an --accuracy-threshold flag fails the
    run when a model is below target (0.95 for fingerspelling and 0.80 for
    words by default in the tests)"
proof:
  - label: Metrics dashboard
    url: https://github.com/biplob819/asl-translator/blob/master/metrics.md
  - label: Production refactor report, before and after
    url: https://github.com/biplob819/asl-translator/blob/master/REFACTOR.md
  - label: Milestone checklist with evidence
    url: https://github.com/biplob819/asl-translator/blob/master/to-do.md
  - label: Fingerspelling golden set (CSV)
    url: https://github.com/biplob819/asl-translator/blob/master/backend/evals/golden/fingerspelling_golden.csv
  - label: Eval suite
    url: https://github.com/biplob819/asl-translator/blob/master/backend/evals/eval_suite.py
  - label: Lessons learned
    url: https://github.com/biplob819/asl-translator/blob/master/lessons.md
timeline:
  - when: 14 Mar 2026
    title: "M0 to M4: scaffold to word recognition"
    status: built
    items:
      - Project scaffold with database, settings and a health endpoint
      - Webcam, MediaPipe landmarks and normalisation
      - Fingerspelling classifier over a WebSocket, with the letter on screen
      - Text accumulation, hold-to-confirm and speech
      - Word recognition with a BiLSTM and a mode toggle
    url: https://github.com/biplob819/asl-translator/commit/0877291
  - when: 15 Mar 2026
    title: M5, M6 and stretch goals A to C
    status: built
    items:
      - Onboarding, hand placement guide, lighting warning and accessibility
      - Docker setup, eval suite and API, frame skipping
      - Conversation mode, a sign-language registry with BSL and ISL stubs, and
        translated speech
    url: https://github.com/biplob819/asl-translator/commit/17f1f88
  - when: 15 Mar 2026
    title: Production refactor
    status: built
    items:
      - Security, reliability, performance and scalability fixes
      - Five-step onboarding and UX and accessibility fixes
      - Before and after recorded in REFACTOR.md
    url: https://github.com/biplob819/asl-translator/commit/ac12d76
datasets:
  - name: ASL Alphabet (Kaggle, grassknoted/asl-alphabet)
    url: https://www.kaggle.com/datasets/grassknoted/asl-alphabet
    note: 87K images in 29 classes (A to Z, space, delete, nothing); the
      fingerspelling model trains on 20,007 hand-landmark samples extracted from
      it
  - name: PopSign ASL v1.0, gislr-mean-agg form (250 signs)
    url: https://github.com/biplob819/asl-translator/blob/master/backend/training/train_word_lstm.py
    note: 137,078 sequences of 10 mean frames, linked here through the training
      script that loads it. It has no participant IDs, so signers could not be
      kept apart in the split
license: MIT
story:
  overview: A web app that translates American Sign Language into text and
    speech in real time from a webcam. MediaPipe finds hand and body landmarks
    in the browser, so video never leaves the device. A FastAPI server
    classifies the landmarks with two small models, a Random Forest for the A to
    Z fingerspelling alphabet and a bidirectional LSTM with attention for 250
    common signs. A conversation mode switches between the two by hand motion.
    It is not deployed publicly; the repo's Docker setup runs it locally once
    the models are trained.
  impact:
    - "Self-built over two days, 14 and 15 March 2026: 13 commits covering
      milestones M0 to M6, three stretch goals and a production refactor"
    - "Fingerspelling: 98.0% on the held-out test split and 99.6% on a
      1,300-sample golden set (target ≥95%), but about 25 ms average inference
      against a <10 ms p95 target"
    - "Words: 83.8% top-1 on 250 signs (target ≥80%), 0.42 ms mean inference, a
      114.8 KB ONNX model; never tested on unseen signers, because the dataset
      has no participant IDs"
    - 28 of 28 planned features built; 83 of 84 backend tests pass, 1 skipped
    - "Video never leaves the browser; no accounts and no analytics. The one
      external call is optional translation, which sends recognised text to the
      free MyMemory API"
  pain:
    who: Deaf and hard-of-hearing people who sign and want hearing colleagues to
      understand them, and people learning ASL who want feedback outside class.
    problem: Interpreters are not always available and typing is slow, so a
      signer in a meeting with hearing colleagues waits or switches to text. A
      learner has no way to check their signing between classes, and human
      tutors are expensive. Developers who want to build on sign recognition
      mostly find notebooks, not apps they can run. These are the three personas
      in the spec, not interview findings.
  bet: If the browser extracts hand landmarks and a CPU server classifies them
    with small models, sign recognition can feel conversational (under 200 ms
    end to end) without sending any video off the device.
  priorities:
    - item: Fingerspelling A to Z with hold-to-confirm, space and delete gestures
      call: built
      why: Letters build words and sentences, and a letter commits only after it
        is held, so a passing handshape does not type.
      url: https://github.com/biplob819/asl-translator/blob/master/to-do.md
    - item: Word mode for 250 common signs
      call: built
      why: So signers can communicate beyond fingerspelling, with everyday signs
        like "thank you" and "help".
      url: https://github.com/biplob819/asl-translator/blob/master/to-do.md
    - item: Conversation mode
      call: built
      why: Signers switch between letters and words without pressing anything;
        hand motion picks the model, and pauses add spaces and full stops.
      url: https://github.com/biplob819/asl-translator/blob/master/spec.md
    - item: Speech output, with translation to Spanish, Hindi, French and German
        before speaking
      call: built
      why: Speech lets hearing people understand; the browser's speech engine
        costs nothing, and the translation API needs no key.
      url: https://github.com/biplob819/asl-translator/blob/master/spec.md
    - item: Onboarding, hand placement guide, lighting warning, keyboard and
        screen-reader support
      call: built
      why: Recognition is less accurate in low light or with the hand badly
        placed, so the app warns and guides.
      url: https://github.com/biplob819/asl-translator/blob/master/REFACTOR.md
    - item: Eval suite, eval API and an accuracy-threshold flag
      call: built
      why: Model quality is tracked, and a drop below target fails the run.
      url: https://github.com/biplob819/asl-translator/blob/master/backend/evals/eval_suite.py
    - item: A signer-independent test split for the word model
      call: cut
      why: The dataset has no participant IDs, so the split is stratified by
        sign, and signer-independent accuracy is reported as N/A.
      url: https://github.com/biplob819/asl-translator/blob/master/metrics.md
    - item: Face landmarks
      call: cut
      why: They add little accuracy but triple the payload and the complexity;
        word mode uses hands and pose only.
      url: https://github.com/biplob819/asl-translator/blob/master/spec.md
    - item: Accounts, a mobile layout, text to sign, recording and offline mode
      call: cut
      why: Out of scope for the first version.
      url: https://github.com/biplob819/asl-translator/blob/master/spec.md
    - item: Public deployment (frontend on Vercel, backend on Railway)
      call: later
      why: Deferred; running locally with Docker was the target for this build.
      url: https://github.com/biplob819/asl-translator/blob/master/to-do.md
    - item: MediaPipe in a Web Worker, model caching in IndexedDB, Safari testing
      call: later
      why: Deferred in M6. The Web Worker was not blocking the first version,
        MediaPipe models load from a CDN, and Safari testing is still unticked
        in the checklist.
      url: https://github.com/biplob819/asl-translator/blob/master/to-do.md
    - item: Per-connection WebSocket rate limiting
      call: later
      why: Deferred because it needs infrastructure.
      url: https://github.com/biplob819/asl-translator/blob/master/REFACTOR.md
    - item: British and Indian Sign Language models
      call: later
      why: Both are registered as coming-soon stubs; a real model needs training
        and a switch to available.
      url: https://github.com/biplob819/asl-translator/blob/master/to-do.md
  evals:
    - name: Fingerspelling accuracy
      data: ASL Alphabet (Kaggle), 20,007 hand-landmark samples, 29 classes,
        stratified 80/20 split
      method: Random Forest on 63 normalised features; target ≥95%
      result: "Pass: 98.0% on the held-out test split; 5-fold cross-validation
        98.01% ± 0.28%"
      status: pass
      url: https://github.com/biplob819/asl-translator/blob/master/metrics.md
    - name: Fingerspelling golden set
      data: 1,300 golden landmark samples committed in the repo
      method: Scored by the eval suite; no separate target
      result: 99.6%
      status: final
      url: https://github.com/biplob819/asl-translator/blob/master/backend/evals/golden/fingerspelling_golden.csv
    - name: Fingerspelling worst class
      data: Held-out test split
      method: Every class at least 80%
      result: "Pass: the worst class is M, at 94.0%"
      status: pass
      url: https://github.com/biplob819/asl-translator/blob/master/metrics.md
    - name: Fingerspelling inference time
      data: Server-side inference
      method: Target p95 under 10 ms
      result: "Fails: about 25 ms on average, already above the p95 target"
      status: fail
      url: https://github.com/biplob819/asl-translator/blob/master/metrics.md
    - name: Word accuracy, top-1
      data: PopSign ASL v1.0 (gislr-mean-agg), 137,078 sequences, 250 signs,
        stratified 80/20 split
      method: BiLSTM with attention; target ≥80%
      result: "Pass: 83.8%. The split could not keep signers apart, so the test
        set may hold signers seen in training"
      status: pass
      url: https://github.com/biplob819/asl-translator/blob/master/metrics.md
    - name: Word accuracy on unseen signers
      data: None available
      method: Target within 20% of signer-dependent accuracy
      result: "N/A: never tested, because the dataset has no participant IDs"
      status: pending
      url: https://github.com/biplob819/asl-translator/blob/master/metrics.md
    - name: Word top-5 and worst-class accuracy
      data: Held-out test split
      method: Targets ≥95% top-5 and ≥60% for every class
      result: Not measured
      status: pending
      url: https://github.com/biplob819/asl-translator/blob/master/metrics.md
    - name: Word inference time
      data: ONNX Runtime on the server, 114.8 KB model, 823K parameters
      method: Target p95 under 50 ms
      result: 0.42 ms mean; the p95 itself is not published
      status: final
      url: https://github.com/biplob819/asl-translator/blob/master/metrics.md
    - name: End-to-end latency
      data: Webcam to text on screen
      method: Target under 200 ms for both modes
      result: Not measured
      status: pending
      url: https://github.com/biplob819/asl-translator/blob/master/metrics.md
    - name: Backend test suite
      data: 84 tests collected
      method: Unit, integration, WebSocket, behavioural and eval tests
      result: "83 pass, 0 fail, 1 skipped: the word eval test, because the word
        golden set is not in the repo"
      status: pass
      url: https://github.com/biplob819/asl-translator/blob/master/metrics.md
  improvements:
    - metric: Security issues found in my code audit
      before: "5"
      after: "0"
      change: Removed CORS credentials, an allowlist for settings keys, a
        5,000-character limit on saved text, rejection of NaN and infinite
        landmark values, and a lock on language switching.
      url: https://github.com/biplob819/asl-translator/blob/master/REFACTOR.md
    - metric: Reliability issues found in the same audit
      before: "6"
      after: "0"
      change: Specific exceptions with logged stack traces, database connection
        pooling, a database check in the health endpoint, and a guard against
        NaN in normalisation.
      url: https://github.com/biplob819/asl-translator/blob/master/REFACTOR.md
    - metric: UX issues found in the same audit
      before: "9"
      after: "0"
      change: A banner when speech is unavailable, the language on the Speak
        button, a Processing state in word mode, browser feature detection and
        smarter transcript scrolling, among others.
      url: https://github.com/biplob819/asl-translator/blob/master/REFACTOR.md
    - metric: Accessibility issues found in the same audit
      before: "5"
      after: "0"
      change: Reduced-motion support, screen-reader announcements for delete
        timeouts, a clearer conversation label, a loading skeleton on the
        settings page, and the hand guide raised from 15% to 25% opacity.
      url: https://github.com/biplob819/asl-translator/blob/master/REFACTOR.md
    - metric: Onboarding steps
      before: "3"
      after: "5"
      change: Added a privacy message to the first step, a live fingerspelling
        try-out, a step that explains the three modes, and a shortcuts summary.
      url: https://github.com/biplob819/asl-translator/blob/master/REFACTOR.md
  monitoring:
    - metric: Model accuracy against target
      kind: quality
      target: ≥95% fingerspelling, ≥80% words
      current: 98.0% fingerspelling (99.6% golden set), 83.8% words
      how: The eval suite runs from the command line or pytest with an
        --accuracy-threshold flag that fails the run below target; GET
        /api/v1/eval/metrics returns overall and per-class accuracy. The repo
        has no CI workflow yet
    - metric: Inference latency, p50/p95/p99 per model
      kind: guardrail
      target: p95 under 10 ms fingerspelling, under 50 ms words
      current: About 25 ms average fingerspelling (missed); 0.42 ms mean words
      how: GET /api/v1/eval/latency
    - metric: Most-confused sign pairs
      kind: quality
      current: Not yet filled in
      how: GET /api/v1/eval/confusion-matrix/{model} returns the full confusion
        matrix
    - metric: Service health
      kind: guardrail
      how: GET /api/v1/health reports whether both models loaded and runs a
        database query; the app's status bar shows frame rate, connection and
        model status
  learnings:
    - lesson: Accuracy measured on signers the model saw in training looks far
        better than it is on new signers, and my word dataset has no participant
        IDs.
      now: Never test on signers seen in training, and when a dataset does not
        label signers, write the limit down. The word model's unseen-signer
        accuracy reads N/A, not a guess.
      url: https://github.com/biplob819/asl-translator/blob/master/lessons.md
    - lesson: If training normalises landmarks differently from live inference,
        accuracy drops in production despite good training numbers.
      now: The landmark extraction script imports the same Python normalisation
        function the server uses, so the two cannot drift.
      url: https://github.com/biplob819/asl-translator/blob/master/lessons.md
    - lesson: FastAPI test clients do not run the app's startup, so every
        WebSocket and API test failed because the models were never loaded.
      now: A test helper loads the models and sets the app state before tests
        that use the client directly.
      url: https://github.com/biplob819/asl-translator/blob/master/lessons.md
    - lesson: Catching every exception swallowed real errors; only the client saw
        a generic message, and nothing reached the server logs.
      now: Code catches specific exception types and logs the stack trace in
        every except block.
      url: https://github.com/biplob819/asl-translator/blob/master/lessons.md
    - lesson: Two language-switch requests at once could leave the server with
        one language's model and another's label map.
      now: Every change to shared app state goes through an async lock.
      url: https://github.com/biplob819/asl-translator/blob/master/lessons.md
    - lesson: Leaving checklist items unticked until the end of a milestone made
        the tracker stale, so progress had to be asked about.
      now: Each task is ticked in to-do.md the moment it is done, never in a
        batch.
      url: https://github.com/biplob819/asl-translator/blob/master/lessons.md
  next:
    - Deploy the frontend to Vercel and the backend to Railway, then verify the
      full flow on a public URL
    - Test in Safari
    - Run MediaPipe in a Web Worker and cache models in IndexedDB
    - Add per-connection WebSocket rate limiting
    - Train real British and Indian Sign Language models to replace the
      coming-soon stubs
source:
  repo: biplob819/asl-translator
  synced: 2026-11-27
---

## Write-up

ASL Translator reads American Sign Language from a webcam and shows it as text, then speaks it. The browser runs MediaPipe to find 21 points on each hand, plus body pose in word mode, and sends only those coordinates over a WebSocket at 10 frames a second. A FastAPI server classifies them. Static letters go to a Random Forest on 63 numbers; moving signs go to a bidirectional LSTM with attention over 10 frames of 225 numbers. A conversation mode watches how fast the hand moves to choose between the two, and turns pauses into spaces and full stops. Recognised text can be spoken in English, or translated first and spoken in Spanish, Hindi, French or German.

I built it over two days, milestone by milestone, with a spec, a feature list and a live checklist in the repo, then ran a production audit and fixed what it found. On offline test sets, fingerspelling reached 98.0% (target ≥95%) and words 83.8% on 250 signs (target ≥80%). Two gaps stay on the page. Fingerspelling inference averaged about 25 ms against a <10 ms p95 target. The word model was never tested on signers it had not seen, because its dataset has no participant IDs. End-to-end latency, word top-5 and worst-class word accuracy are not measured yet ([metrics](https://github.com/biplob819/asl-translator/blob/master/metrics.md)).

## Key decisions

**Landmarks in the browser, classification on the server.** MediaPipe runs in the browser as WebAssembly, and only coordinates cross the network, about 1 to 2 KB a frame for fingerspelling. Classification stays on a CPU server rather than in the browser. *Trade-off:* it needs a server and a network round trip, so there is no offline mode. In exchange, no video leaves the device and the models stay small and fast.

**Two models, not one.** A static letter and a moving sign are different problems: one frame of one hand against a sequence of hands and pose. A Random Forest handles the first and a BiLSTM the second. *Trade-off:* two pipelines and two normalisations to keep in step, and conversation mode needed a motion detector to pick between them.

**PyTorch and ONNX instead of TensorFlow.** TensorFlow did not support Python 3.14, so the word model trains in PyTorch and runs in ONNX Runtime. The dataset stores 10 averaged frames per sign, so the browser collects 30 raw frames and averages them into 10 to match. *Trade-off:* the browser has to reshape live input to match how the training data was stored.

**Report the signer gap instead of hiding it.** The word dataset has no participant IDs, so the test split could not keep signers apart. *Trade-off:* the 83.8% may be higher than a new signer would see, and the page says so; signer-independent accuracy is N/A until a dataset that labels signers is used.
