---
# Documentation: https://wowchemy.com/docs/managing-content/

title: On the use of textual feature extraction techniques to support the automated
  detection of refactoring documentation
subtitle: ''
summary: ''
authors:
- Licelot Marmolejos
- Eman Abdullah AlOmar
- Mohamed Wiem Mkaouer
- Christian Newman
- Ali Ouni
tags: []
categories: []
date: '2021-01-01'
lastmod: 2022-01-26T01:31:36-05:00
featured: false
draft: false

# Featured image
# To use, add an image named `featured.jpg/png` to your page's folder.
# Focal points: Smart, Center, TopLeft, Top, TopRight, Left, Right, BottomLeft, Bottom, BottomRight.
image:
  caption: ''
  focal_point: ''
  preview_only: false

# Projects (optional).
#   Associate this post with one or more of your projects.
#   Simply enter your project's folder or file name without extension.
#   E.g. `projects = ["internal-project"]` references `content/project/deep-learning/index.md`.
#   Otherwise, set `projects = []`.
projects: []
publishDate: '2022-01-26T06:31:34.613712Z'
publication_types:
- '2'
abstract: 'Refactoring is the art of improving the internal structure of a program without altering its external behavior, and it is an important task when it comes to
  software maintainability. While existing studies have focused on the detection of refactoring operations by
  mining software repositories, little was done to understand how developers document their refactoring activities. Therefore, there is recent trend trying to detect
  developers documentation of refactoring, by manually analyzing their internal and external software documentation. However, these techniques are limited by
  their manual process, which hinders their scalability.
  Hence, in this study, we tackle the detection of refactoring documentation as binary classification problem. We focus on the automatic detection of refactoring activities in commit messages by relying on text-mining,
  natural language preprocessing, and supervised machine learning techniques. We design our tool to overcome the limitation of the manual process, previously
  proposed by existing studies, through exploring the transformation of commit messages into features that are used to train various models. For our evaluation, we
  use and compare five different binary classification algorithms, and we test the effectiveness of these models using an existing dataset of manually curated messages that are known to be documenting refactoring activities in the source code. The experiments are carried
  out with different data sizes and number of bits. As per our results, the combination of Chi-Squared with Bayes Point Machine (BPM) and Fisher Score with Bayes Point
  Machine could be the most efficient when it comes to automatically identifying refactoring text patterns in commit messages, with an accuracy of 0.96, and an FScore of 0.96.'
publication: '*Innovations in Systems and Software Engineering*'
---
