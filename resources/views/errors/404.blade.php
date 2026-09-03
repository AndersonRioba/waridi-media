<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>404 — Page Lost in Focus | Waridi Photo Studio</title>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Cinzel:wght@500;700;900&family=Plus+Jakarta+Sans:wght@300;400;500;600&display=swap" rel="stylesheet">
    <style>
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        body {
            font-family: 'Plus Jakarta Sans', system-ui, sans-serif;
            background-color: #FAF7F0;
            color: #141414;
            min-height: 100vh;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            text-align: center;
            padding: 2rem 1.5rem;
            position: relative;
            overflow-x: hidden;
        }
        .glow {
            position: absolute;
            width: 450px;
            height: 450px;
            border-radius: 50%;
            filter: blur(80px);
            pointer-events: none;
            z-index: 1;
        }
        .glow-1 { top: 10%; left: -100px; background: rgba(201, 162, 39, 0.12); }
        .glow-2 { bottom: 10%; right: -100px; background: rgba(232, 199, 102, 0.15); }
        
        .container {
            position: relative;
            z-index: 2;
            max-width: 600px;
            margin: 0 auto;
        }
        .logo {
            max-height: 48px;
            width: auto;
            margin-bottom: 2rem;
            display: inline-block;
        }
        .code-watermark {
            font-family: 'Cinzel', serif;
            font-size: clamp(6rem, 18vw, 10rem);
            font-weight: 900;
            line-height: 1;
            letter-spacing: -0.05em;
            background: linear-gradient(180deg, rgba(201, 162, 39, 0.7) 0%, rgba(232, 199, 102, 0.25) 80%, transparent 100%);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            user-select: none;
            margin-bottom: -1rem;
        }
        .badge {
            display: inline-block;
            padding: 0.4rem 1.2rem;
            border-radius: 9999px;
            background: rgba(250, 247, 240, 0.95);
            border: 1px solid rgba(201, 162, 39, 0.4);
            color: #8A6A16;
            font-size: 0.72rem;
            font-weight: 600;
            text-transform: uppercase;
            letter-spacing: 0.22em;
            box-shadow: 0 2px 8px rgba(0,0,0,0.03);
            margin-bottom: 1.5rem;
        }
        .divider {
            height: 1px;
            width: 140px;
            margin: 0 auto 1.5rem;
            background: linear-gradient(90deg, transparent, #C9A227, transparent);
        }
        h1 {
            font-family: 'Cinzel', serif;
            font-size: clamp(1.5rem, 4vw, 2.25rem);
            font-weight: 700;
            color: #141414;
            margin-bottom: 0.85rem;
            letter-spacing: -0.01em;
        }
        p {
            color: #5C5850;
            font-size: 0.95rem;
            line-height: 1.65;
            font-weight: 300;
            margin-bottom: 2rem;
        }
        .actions {
            display: flex;
            flex-wrap: wrap;
            gap: 1rem;
            justify-content: center;
            align-items: center;
            margin-bottom: 2.5rem;
        }
        .btn-primary {
            display: inline-flex;
            align-items: center;
            gap: 0.5rem;
            background: #141414;
            color: #FAF7F0;
            text-decoration: none;
            padding: 0.85rem 1.8rem;
            font-size: 0.75rem;
            font-weight: 600;
            text-transform: uppercase;
            letter-spacing: 0.16em;
            transition: all 0.25s ease;
            box-shadow: 0 4px 14px rgba(20, 20, 20, 0.18);
        }
        .btn-primary:hover {
            background: #C9A227;
            color: #141414;
            transform: translateY(-2px);
            box-shadow: 0 6px 20px rgba(201, 162, 39, 0.35);
        }
        .btn-secondary {
            display: inline-flex;
            align-items: center;
            gap: 0.5rem;
            background: #FFFFFF;
            color: #141414;
            text-decoration: none;
            padding: 0.85rem 1.8rem;
            font-size: 0.75rem;
            font-weight: 600;
            text-transform: uppercase;
            letter-spacing: 0.16em;
            border: 1px solid #E8DFC8;
            transition: all 0.25s ease;
        }
        .btn-secondary:hover {
            border-color: #C9A227;
            transform: translateY(-2px);
            background: #FAF7F0;
        }
        .nav-links {
            padding-top: 1.5rem;
            border-top: 1px solid #E8DFC8;
            font-size: 0.8rem;
            color: #7A766E;
        }
        .nav-links a {
            color: #5C5850;
            text-decoration: none;
            margin: 0 0.5rem;
            transition: color 0.2s;
        }
        .nav-links a:hover {
            color: #C9A227;
        }
    </style>
</head>
<body>
    <div class="glow glow-1"></div>
    <div class="glow glow-2"></div>

    <div class="container">
        <a href="/">
            <img src="/images/waridi-logo.jpg" alt="Waridi Photo Studio" class="logo">
        </a>

        <div class="code-watermark">404</div>
        <div class="badge">Framing Error</div>
        <div class="divider"></div>

        <h1>Page Lost in Focus</h1>
        <p>The page, project gallery, or journal article you are searching for might have been archived, renamed, or does not exist.</p>

        <div class="actions">
            <a href="/" class="btn-primary">Return to Home</a>
            <a href="/portfolio" class="btn-secondary">Explore Portfolio</a>
            <a href="/contact" class="btn-secondary">Contact Studio</a>
        </div>

        <div class="nav-links">
            <span>Or explore:</span>
            <a href="/services">Services</a> •
            <a href="/about">About</a> •
            <a href="/livestream">Live Events</a> •
            <a href="/journal">Journal</a>
        </div>
    </div>
</body>
</html>
