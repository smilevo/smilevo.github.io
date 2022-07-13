---
# Documentation: https://wowchemy.com/docs/managing-content/

title: How we refactor and how we document it? On the use of supervised machine learning
  algorithms to classify refactoring documentation
subtitle: ''
summary: ''
authors:
- Eman Abdullah AlOmar
- Anthony Peruma
- Mohamed Wiem Mkaouer
- Christian Newman
- Ali Ouni
- Marouane Kessentini
tags: []
categories: []
date: '2021-01-01'
lastmod: 2022-01-26T01:31:25-05:00
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
publishDate: '2022-01-26T06:31:22.893823Z'
publication_types:
- '2'
abstract: 'Refactoring is the art of improving the structural design of a software system without altering its external behavior. Today, refactoring has become a well established and disciplined software engineering practice that has attracted a significant amount of research presuming that refactoring is primarily motivated by the need to improve system structures. However, recent studies have shown that developers may incorporate refactoring strategies in other development-related activities that go beyond improving the design especially with the emerging challenges in contemporary software engineering. Unfortunately, these studies are limited to developer interviews and a reduced set of projects. To cope with the above-mentioned limitations, we aim to better understand what motivates developers to apply a refactoring by mining and automatically classifying a large set of 111,884 commits containing refactoring activities, extracted from 800 open source Java projects. We trained a multi-class classifier to categorize these commits into three categories, namely, Internal Quality Attribute, External Quality Attribute, and Code Smell Resolution, along with the traditional Bug Fix and Functional categories. This classification challenges the original definition of refactoring, being exclusive to improving software design and fixing code smells. Furthermore, to better understand our classification results, we qualitatively analyzed commit messages to extract textual patterns that developers regularly use to describe their refactoring activities. The results of our empirical investigation show that (1) fixing code smells is not the main driver for developers to refactoring their code bases. Refactoring is solicited for a wide variety of reasons, going beyond its traditional definition;(2) the distribution of refactoring operations differ between production and test files; (3) developers use a variety of patterns to purposefully target refactoring-related activities; (4) the textual patterns, extracted from commit messages, provide a better coverage for how developers document their refactorings.'
publication: '*Expert Systems with Applications*'
---
