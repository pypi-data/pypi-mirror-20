<p align="center"><img src="https://github.com/neuropsychology/NeuroKit.py/blob/master/docs/img/neurokit.png" width="400" align="center" alt="neurokit python logo"></p>

---

# NeuroKit.py 
A Python Toolbox for Statistics and Neurophysiological Signal Processing (EEG, EDA, ECG, EMG...).





|Name|NeuroKit|
|----------------|---|
|Latest Version|[![](https://img.shields.io/badge/version-0.0.6-brightred.svg)](https://pypi.python.org/pypi/neurokit)|
|Documentation|[![Documentation Status](https://readthedocs.org/projects/neurokit/badge/?version=latest)](http://neurokit.readthedocs.io/en/latest/?badge=latest)|
|Discussion|[![Join the chat at https://gitter.im/NeuroKit-py/Lobby](https://badges.gitter.im/NeuroKit-py/Lobby.svg)](https://gitter.im/NeuroKit-py/Lobby?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)|
|Questions|[![](https://img.shields.io/badge/issue-create-purple.svg?colorB=FF9800)](https://github.com/neuropsychology/NeuroKit.py/issues)|
|Authors|[![](https://img.shields.io/badge/CV-D._Makowski-purple.svg?colorB=9C27B0)](https://cdn.rawgit.com/neuropsychology/Organization/master/CVs/DominiqueMakowski.pdf)|

---

**Warning: This package is under development.**

## Description

Features:

- **M/EEG***
  - Data loading
  - Preprocessing
  - Filtering
  - Microstates (under development)
- **Electrodermal Activity (EDA)**
- **Electro-Cardiography (ECG)**
- **Statistics**
  - Feature reduction (PCA, ICA...)
  - Z scores
- **Other**
  - Load and convert biopac:copyright:'s AcqKnowledge files to a `pandas`' dataframe
  - Fractal/chaos/entropy indices computation

\**Warning*: mainly wrapper functions based on [mne](http://martinos.org/mne/stable/index.html). Go master **mne** first! :wink:
## Install

Run the following:

```bash
pip install https://github.com/neuropsychology/NeuroKit.py/zipball/master
```

## Example

#### Fractal/chaos/entropy indices computation
```python
import neurokit as nk
signal = [5, 1, 7, 2, 5, 1, 7, 4, 6, 7, 5, 4, 1, 1, 4, 4]
results = nk.fractal_dimensions(signal)
print(results["Entropy"])
```

#### Z-scores
```python
import neurokit as nk
raw_scores = [1, 2, 8, 6, 2, 4]
z_scores = nk.z_score(raw_scores)
```


