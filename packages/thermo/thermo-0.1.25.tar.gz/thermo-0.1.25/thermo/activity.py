# -*- coding: utf-8 -*-
'''Chemical Engineering Design Library (ChEDL). Utilities for process modeling.
Copyright (C) 2016, Caleb Bell <Caleb.Andrew.Bell@gmail.com>

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.'''

from __future__ import division

__all__ = ['K', 'Rachford_Rice_flash_error', 'Rachford_Rice_solution', 'Li_Johns_Ahmadi_solution', 'flash_inner_loop', 'flash', 'dew_at_T', 
           'bubble_at_T', 'identify_phase', 'mixture_phase_methods', 
           'identify_phase_mixture', 'Pbubble_mixture', 'Pdew_mixture']

from scipy.optimize import fsolve, newton, brenth
from thermo.utils import exp, log
from thermo.utils import none_and_length_check

from scipy.constants import R



def K(P, Psat, fugacity=1, gamma=1):
    '''
    >>> K(101325, 3000.)
    0.029607698001480384
    >>> K(101325, 3000., fugacity=0.9, gamma=2.4)
    0.07895386133728102
    '''
    # http://www.jmcampbell.com/tip-of-the-month/2006/09/how-to-determine-k-values/
    return Psat*gamma/P/fugacity





### Solutions using a existing algorithms
def Rachford_Rice_flash_error(V_over_F, zs, Ks):
    r'''Calculates the objective function of the Rachford-Rice flash equation.
    This function should be called by a solver seeking a solution to a flash
    calculation. The unknown variable is `V_over_F`, for which a solution 
    must be between 0 and 1.
    
    .. math::
        \sum_i \frac{z_i(K_i-1)}{1 + \frac{V}{F}(K_i-1)} = 0

    Parameters
    ----------
    V_over_F : float
        Vapor fraction guess [-]
    zs : list[float]
        Overall mole fractions of all species, [-]
    Ks : list[float]
        Equilibrium K-values, [-]

    Returns
    -------
    error : float
        Deviation between the objective function at the correct V_over_F
        and the attempted V_over_F, [-]

    Notes
    -----
    The derivation is as follows:
    
    .. math::
        F z_i = L x_i + V y_i
        
        x_i = \frac{z_i}{1 + \frac{V}{F}(K_i-1)}
        
        \sum_i y_i = \sum_i K_i x_i = 1
        
        \sum_i(y_i - x_i)=0
        
        \sum_i \frac{z_i(K_i-1)}{1 + \frac{V}{F}(K_i-1)} = 0

    Examples
    --------
    >>> Rachford_Rice_flash_error(0.5, zs=[0.5, 0.3, 0.2], 
    ... Ks=[1.685, 0.742, 0.532])
    0.04406445591174976

    References
    ----------
    .. [1] Rachford, H. H. Jr, and J. D. Rice. "Procedure for Use of Electronic
       Digital Computers in Calculating Flash Vaporization Hydrocarbon 
       Equilibrium." Journal of Petroleum Technology 4, no. 10 (October 1, 
       1952): 19-3. doi:10.2118/952327-G.
    '''
    return sum([zi*(Ki-1.)/(1.+V_over_F*(Ki-1.)) for Ki, zi in zip(Ks, zs)])


def Rachford_Rice_solution(zs, Ks):
    r'''Solves the objective function of the Rachford-Rice flash equation.
    Uses the method proposed in [2]_ to obtain an initial guess.
    
    .. math::
        \sum_i \frac{z_i(K_i-1)}{1 + \frac{V}{F}(K_i-1)} = 0

    Parameters
    ----------
    zs : list[float]
        Overall mole fractions of all species, [-]
    Ks : list[float]
        Equilibrium K-values, [-]

    Returns
    -------
    V_over_F : float
        Vapor fraction solution [-]
    xs : list[float]
        Mole fractions of each species in the liquid phase, [-]
    ys : list[float]
        Mole fractions of each species in the vapor phase, [-]

    Notes
    -----
    The initial guess is the average of the following, as described in [2]_.
    
    .. math::
        \left(\frac{V}{F}\right)_{min} = \frac{(K_{max}-K_{min})z_{of\;K_{max}} 
        - (1-K_{min})}{(1-K_{min})(K_{max}-1)}

        \left(\frac{V}{F}\right)_{max} = \frac{1}{1-K_{min}}
    
    Another algorithm for determining the range of the correct solution is
    given in [3]_; [2]_ provides a narrower range however. For both cases,
    each guess should be limited to be between 0 and 1 as they are often
    negative or larger than 1.
    
    .. math::
        \left(\frac{V}{F}\right)_{min} = \frac{1}{1-K_{max}}
        
        \left(\frac{V}{F}\right)_{max} = \frac{1}{1-K_{min}}

    If the `newton` method does not converge, a bisection method (brenth) is 
    used instead. However, it is somewhat slower, especially as newton will
    attempt 50 iterations before giving up.

    Examples
    --------
    >>> Rachford_Rice_solution(zs=[0.5, 0.3, 0.2], Ks=[1.685, 0.742, 0.532])
    (0.6907302627738542, [0.3394086969663436, 0.3650560590371706, 0.2955352439964858], [0.571903654388289, 0.27087159580558057, 0.15722474980613044])

    References
    ----------
    .. [1] Rachford, H. H. Jr, and J. D. Rice. "Procedure for Use of Electronic
       Digital Computers in Calculating Flash Vaporization Hydrocarbon 
       Equilibrium." Journal of Petroleum Technology 4, no. 10 (October 1, 
       1952): 19-3. doi:10.2118/952327-G.
    .. [2] Li, Yinghui, Russell T. Johns, and Kaveh Ahmadi. "A Rapid and Robust
       Alternative to Rachford-Rice in Flash Calculations." Fluid Phase 
       Equilibria 316 (February 25, 2012): 85-97. 
       doi:10.1016/j.fluid.2011.12.005.
    .. [3] Whitson, Curtis H., and Michael L. Michelsen. "The Negative Flash." 
       Fluid Phase Equilibria, Proceedings of the Fifth International 
       Conference, 53 (December 1, 1989): 51-71. 
       doi:10.1016/0378-3812(89)80072-X.
    '''
    Kmin = min(Ks)
    Kmax = max(Ks)
    z_of_Kmax = zs[Ks.index(Kmax)]

    V_over_F_min = ((Kmax-Kmin)*z_of_Kmax - (1.-Kmin))/((1.-Kmin)*(Kmax-1.))
    V_over_F_max = 1./(1.-Kmin)
        
    V_over_F_min2 = max(0., V_over_F_min)
    V_over_F_max2 = min(1., V_over_F_max)

    x0 = (V_over_F_min2 + V_over_F_max2)*0.5
    try:
        # Newton's method is marginally faster than brenth
        V_over_F = newton(Rachford_Rice_flash_error, x0=x0, args=(zs, Ks))
        # newton skips out of its specified range in some cases, finding another solution
        # Check for that with asserts, and use brenth if it did
        assert x1 >= V_over_F_min2
        assert x1 <= V_over_F_max2
    except:
        V_over_F = brenth(Rachford_Rice_flash_error, V_over_F_max-1E-7, V_over_F_min+1E-7, args=(zs, Ks))
    # Cases not covered by the above solvers: When all components have K > 1, or all have K < 1
    # Should get a solution for all other cases.
    xs = [zi/(1.+V_over_F*(Ki-1.)) for zi, Ki in zip(zs, Ks)]
    ys = [Ki*xi for xi, Ki in zip(xs, Ks)]
    return V_over_F, xs, ys


def Li_Johns_Ahmadi_solution(zs, Ks):
    r'''Solves the objective function of the Li-Johns-Ahmadi flash equation.
    Uses the method proposed in [1]_ to obtain an initial guess.
    
    .. math::
        0 = 1 + \left(\frac{K_{max}-K_{min}}{K_{min}-1}\right)x_1 
        + \sum_{i=2}^{n-1}\frac{K_i-K_{min}}{K_{min}-1}\left[\frac{z_i(K_{max}
        -1)x_{max}}{(K_i-1)z_{max} + (K_{max}-K_i)x_{max}}\right]

    Parameters
    ----------
    zs : list[float]
        Overall mole fractions of all species, [-]
    Ks : list[float]
        Equilibrium K-values, [-]

    Returns
    -------
    V_over_F : float
        Vapor fraction solution [-]
    xs : list[float]
        Mole fractions of each species in the liquid phase, [-]
    ys : list[float]
        Mole fractions of each species in the vapor phase, [-]

    Notes
    -----
    The initial guess is the average of the following, as described in [1]_.
    Each guess should be limited to be between 0 and 1 as they are often
    negative or larger than 1. `max` refers to the corresponding mole fractions
    for the species with the largest K value.
    
    .. math::
        \left(\frac{1-K_{min}}{K_{max}-K_{min}}\right)z_{max}\le x_{max} \le
        \left(\frac{1-K_{min}}{K_{max}-K_{min}}\right)
        
    If the `newton` method does not converge, a bisection method (brenth) is 
    used instead. However, it is somewhat slower, especially as newton will
    attempt 50 iterations before giving up.
        
    This method does not work for problems of only two components.
    K values are sorted internally. Has not been found to be quicker than the
    Rachford-Rice equation.

    Examples
    --------
    >>> Li_Johns_Ahmadi_solution(zs=[0.5, 0.3, 0.2], Ks=[1.685, 0.742, 0.532])
    (0.6907302627738544, [0.33940869696634357, 0.3650560590371706, 0.2955352439964858], [0.5719036543882889, 0.27087159580558057, 0.15722474980613044])

    References
    ----------
    .. [1] Li, Yinghui, Russell T. Johns, and Kaveh Ahmadi. "A Rapid and Robust
       Alternative to Rachford-Rice in Flash Calculations." Fluid Phase 
       Equilibria 316 (February 25, 2012): 85-97. 
       doi:10.1016/j.fluid.2011.12.005.
    '''
    # Re-order both Ks and Zs by K value, higher coming first
    p = sorted(zip(Ks,zs), reverse=True)
    Ks_sorted, zs_sorted = [K for (K,z) in p], [z for (K,z) in p]
    

    # Largest K value and corresponding overall mole fraction
    k1 = Ks_sorted[0]
    z1 = zs_sorted[0]
    # Smallest K value
    kn = Ks_sorted[-1]

    x_min = (1. - kn)/(k1 - kn)*z1
    x_max = (1. - kn)/(k1 - kn)
    
    x_min2 = max(0., x_min)
    x_max2 = min(1., x_max)
    
    x_guess = (x_min2 + x_max2)*0.5
    
    length = len(zs)-1
    kn_m_1 = kn-1.
    k1_m_1 = (k1-1.)
    t1 = (k1-kn)/(kn-1.)
    
    objective = lambda x1: 1. + t1*x1 + sum([(ki-kn)/(kn_m_1) * zi*k1_m_1*x1 /( (ki-1.)*z1 + (k1-ki)*x1) for ki, zi in zip(Ks_sorted[1:length], zs_sorted[1:length])])
    try:
        x1 = newton(objective, x_guess)
        # newton skips out of its specified range in some cases, finding another solution
        # Check for that with asserts, and use brenth if it did
        # Must also check that V_over_F is right.
        assert x1 >= x_min2
        assert x1 <= x_max2
        assert 0 <= V_over_F <= 1
    except:
        x1 = brenth(objective, x_min, x_max)
    V_over_F = (-x1 + z1)/(x1*(k1 - 1.))
    xs = [zi/(1.+V_over_F*(Ki-1.)) for zi, Ki in zip(zs, Ks)]
    ys = [Ki*xi for xi, Ki in zip(xs, Ks)]
    return V_over_F, xs, ys


flash_inner_loop_methods = ['Analytical', 'Rachford-Rice', 'Li-Johns-Ahmadi']
def flash_inner_loop(zs, Ks, AvailableMethods=False, Method=None):
    r'''This function handles the solution of the inner loop of a flash
    calculation, solving for liquid and gas mole fractions and vapor fraction
    based on specified overall mole fractions and K values. As K values are
    weak functions of composition, this should be called repeatedly by an outer
    loop. Will automatically select an algorithm to use if no Method is 
    provided. Should always provide a solution.

    The automatic algorithm selection will try an analytical solution, and use
    the Rachford-Rice method if there are 4 or more components in the mixture.

    Parameters
    ----------
    zs : list[float]
        Overall mole fractions of all species, [-]
    Ks : list[float]
        Equilibrium K-values, [-]

    Returns
    -------
    V_over_F : float
        Vapor fraction solution [-]
    xs : list[float]
        Mole fractions of each species in the liquid phase, [-]
    ys : list[float]
        Mole fractions of each species in the vapor phase, [-]
    methods : list, only returned if AvailableMethods == True
        List of methods which can be used to obtain a solution with the given 
        inputs

    Other Parameters
    ----------------
    Method : string, optional
        The method name to use. Accepted methods are 'Analytical', 
        'Rachford-Rice', and 'Li-Johns-Ahmadi'. All valid values are also held  
        in the list `flash_inner_loop_methods`.
    AvailableMethods : bool, optional
        If True, function will determine which methods can be used to obtain
        a solution for the desired chemical, and will return methods instead of
        `V_over_F`, `xs`, and `ys`.

    Notes
    -----
    A total of three methods are available for this function. They are:

        * 'Analytical', an exact solution derived with SymPy, applicable only
          only to mixtures of two or three components
        * 'Rachford-Rice', which numerically solves an objective function
          described in :obj:`Rachford_Rice_solution`.
        * 'Li-Johns-Ahmadi', which numerically solves an objective function
          described in :obj:`Li_Johns_Ahmadi_solution`.

    Examples
    --------
    >>> flash_inner_loop(zs=[0.5, 0.3, 0.2], Ks=[1.685, 0.742, 0.532])
    (0.6907302627738537, [0.3394086969663437, 0.36505605903717053, 0.29553524399648573], [0.5719036543882892, 0.2708715958055805, 0.1572247498061304])
    '''
    l = len(zs)
    def list_methods():
        methods = []
        if l in [2,3]:
            methods.append('Analytical')
        if l >= 2:
            methods.append('Rachford-Rice')
        if l >= 3:
            methods.append('Li-Johns-Ahmadi')
        return methods
    if AvailableMethods:
        return list_methods()
    if not Method:
        Method = list_methods()[0]
    if Method == 'Analytical':
        if l == 2:
            z1, z2 = zs
            K1, K2 = Ks
            V_over_F = (-K1*z1 - K2*z2 + z1 + z2)/(K1*K2*z1 + K1*K2*z2 - K1*z1 - K1*z2 - K2*z1 - K2*z2 + z1 + z2)
        elif l == 3:
            z1, z2, z3 = zs
            K1, K2, K3 = Ks
            V_over_F = (-K1*K2*z1/2 - K1*K2*z2/2 - K1*K3*z1/2 - K1*K3*z3/2 + K1*z1 + K1*z2/2 + K1*z3/2 - K2*K3*z2/2 - K2*K3*z3/2 + K2*z1/2 + K2*z2 + K2*z3/2 + K3*z1/2 + K3*z2/2 + K3*z3 - z1 - z2 - z3 - (K1**2*K2**2*z1**2 + 2*K1**2*K2**2*z1*z2 + K1**2*K2**2*z2**2 - 2*K1**2*K2*K3*z1**2 - 2*K1**2*K2*K3*z1*z2 - 2*K1**2*K2*K3*z1*z3 + 2*K1**2*K2*K3*z2*z3 - 2*K1**2*K2*z1*z2 + 2*K1**2*K2*z1*z3 - 2*K1**2*K2*z2**2 - 2*K1**2*K2*z2*z3 + K1**2*K3**2*z1**2 + 2*K1**2*K3**2*z1*z3 + K1**2*K3**2*z3**2 + 2*K1**2*K3*z1*z2 - 2*K1**2*K3*z1*z3 - 2*K1**2*K3*z2*z3 - 2*K1**2*K3*z3**2 + K1**2*z2**2 + 2*K1**2*z2*z3 + K1**2*z3**2 - 2*K1*K2**2*K3*z1*z2 + 2*K1*K2**2*K3*z1*z3 - 2*K1*K2**2*K3*z2**2 - 2*K1*K2**2*K3*z2*z3 - 2*K1*K2**2*z1**2 - 2*K1*K2**2*z1*z2 - 2*K1*K2**2*z1*z3 + 2*K1*K2**2*z2*z3 + 2*K1*K2*K3**2*z1*z2 - 2*K1*K2*K3**2*z1*z3 - 2*K1*K2*K3**2*z2*z3 - 2*K1*K2*K3**2*z3**2 + 4*K1*K2*K3*z1**2 + 4*K1*K2*K3*z1*z2 + 4*K1*K2*K3*z1*z3 + 4*K1*K2*K3*z2**2 + 4*K1*K2*K3*z2*z3 + 4*K1*K2*K3*z3**2 + 2*K1*K2*z1*z2 - 2*K1*K2*z1*z3 - 2*K1*K2*z2*z3 - 2*K1*K2*z3**2 - 2*K1*K3**2*z1**2 - 2*K1*K3**2*z1*z2 - 2*K1*K3**2*z1*z3 + 2*K1*K3**2*z2*z3 - 2*K1*K3*z1*z2 + 2*K1*K3*z1*z3 - 2*K1*K3*z2**2 - 2*K1*K3*z2*z3 + K2**2*K3**2*z2**2 + 2*K2**2*K3**2*z2*z3 + K2**2*K3**2*z3**2 + 2*K2**2*K3*z1*z2 - 2*K2**2*K3*z1*z3 - 2*K2**2*K3*z2*z3 - 2*K2**2*K3*z3**2 + K2**2*z1**2 + 2*K2**2*z1*z3 + K2**2*z3**2 - 2*K2*K3**2*z1*z2 + 2*K2*K3**2*z1*z3 - 2*K2*K3**2*z2**2 - 2*K2*K3**2*z2*z3 - 2*K2*K3*z1**2 - 2*K2*K3*z1*z2 - 2*K2*K3*z1*z3 + 2*K2*K3*z2*z3 + K3**2*z1**2 + 2*K3**2*z1*z2 + K3**2*z2**2)**0.5/2)/(K1*K2*K3*z1 + K1*K2*K3*z2 + K1*K2*K3*z3 - K1*K2*z1 - K1*K2*z2 - K1*K2*z3 - K1*K3*z1 - K1*K3*z2 - K1*K3*z3 + K1*z1 + K1*z2 + K1*z3 - K2*K3*z1 - K2*K3*z2 - K2*K3*z3 + K2*z1 + K2*z2 + K2*z3 + K3*z1 + K3*z2 + K3*z3 - z1 - z2 - z3)
        else:
            raise Exception('Only solutions of one or two variables are available analytically')
        xs = [zi/(1.+V_over_F*(Ki-1.)) for zi, Ki in zip(zs, Ks)]
        ys = [Ki*xi for xi, Ki in zip(xs, Ks)]
        return V_over_F, xs, ys
    elif Method == 'Rachford-Rice':
        return Rachford_Rice_solution(zs=zs, Ks=Ks)
    elif Method == 'Li-Johns-Ahmadi':
        return Li_Johns_Ahmadi_solution(zs=zs, Ks=Ks)
    else:
        raise Exception('Incorrect Method input')



def flash(P, zs, Psats, fugacities=None, gammas=None):
    if not fugacities:
        fugacities = [1 for i in range(len(zs))]
    if not gammas:
        gammas = [1 for i in range(len(zs))]
    if not none_and_length_check((zs, Psats, fugacities, gammas)):
        raise Exception('Input dimentions are inconsistent or some input parameters are missing.')
    Ks = [K(P, Psats[i], fugacities[i], gammas[i]) for i in range(len(zs))]
    def valid_range(zs, Ks):
        valid = True
        if sum([zs[i]*Ks[i] for i in range(len(Ks))]) < 1:
            valid = False
        if sum([zs[i]/Ks[i] for i in range(len(Ks))]) < 1:
            valid = False
        return valid
    if not valid_range(zs, Ks):
        raise Exception('Solution does not exist')
        
    V_over_F, xs, ys = flash_inner_loop(zs=zs, Ks=Ks)
    if V_over_F < 0:
        raise Exception('V_over_F is negative!')
    return xs, ys, V_over_F




def dew_at_T(zs, Psats, fugacities=None, gammas=None):
    '''
    >>> dew_at_T([0.5, 0.5], [1400, 7000])
    2333.3333333333335
    >>> dew_at_T([0.5, 0.5], [1400, 7000], gammas=[1.1, .75])
    2381.443298969072
    >>> dew_at_T([0.5, 0.5], [1400, 7000], gammas=[1.1, .75], fugacities=[.995, 0.98])
    2401.621874512658
    '''
    if not fugacities:
        fugacities = [1 for i in range(len(Psats))]
    if not gammas:
        gammas = [1 for i in range(len(Psats))]
    if not none_and_length_check((zs, Psats, fugacities, gammas)):
        raise Exception('Input dimentions are inconsistent or some input parameters are missing.')
    P = 1/sum(zs[i]*fugacities[i]/Psats[i]/gammas[i] for i in range(len(zs)))
    return P


def bubble_at_T(zs, Psats, fugacities=None, gammas=None):
    '''
    >>> bubble_at_T([0.5, 0.5], [1400, 7000])
    4200.0
    >>> bubble_at_T([0.5, 0.5], [1400, 7000], gammas=[1.1, .75])
    3395.0
    >>> bubble_at_T([0.5, 0.5], [1400, 7000], gammas=[1.1, .75], fugacities=[.995, 0.98])
    3452.440775305097
    '''
    if not fugacities:
        fugacities = [1 for i in range(len(Psats))]
    if not gammas:
        gammas = [1 for i in range(len(Psats))]
    if not none_and_length_check((zs, Psats, fugacities, gammas)):
        raise Exception('Input dimentions are inconsistent or some input parameters are missing.')
    P = sum(zs[i]*Psats[i]*gammas[i]/fugacities[i] for i in range(len(zs)))
    return P


def identify_phase(T, P, Tm=None, Tb=None, Tc=None, Psat=None):
    r'''Determines the phase of a one-species chemical system according to 
    basic rules, using whatever information is available. Considers only the
    phases liquid, solid, and gas; does not consider two-phase
    scenarios, as should occurs between phase boundaries. 
    
    * If the melting temperature is known and the temperature is under or equal  
      to it, consider it a solid.
    * If the critical temperature is known and the temperature is greater or 
      equal to it, consider it a gas.
    * If the vapor pressure at `T` is known and the pressure is under or equal 
      to it, consider it a gas. If the pressure is greater than the vapor 
      pressure, consider it a liquid.
    * If the melting temperature, critical temperature, and vapor pressure are
      not known, attempt to use the boiling point to provide phase information.
      If the pressure is between 90 kPa and 110 kPa (approximately normal),
      consider it a liquid if it is under the boiling temperature and a gas if 
      above the boiling temperature.
    * If the pressure is above 110 kPa and the boiling temperature is known,
      consider it a liquid if the temperature is under the boiling temperature.
    * Return None otherwise.
    
    Parameters
    ----------
    T : float
        Temperature, [K]
    P : float
        Pressure, [Pa]
    Tm : float, optional
        Normal melting temperature, [K]
    Tb : float, optional
        Normal boiling point, [K]
    Tc : float, optional
        Critical temperature, [K]
    Psat : float, optional
        Vapor pressure of the fluid at `T`, [Pa]

    Returns
    -------
    phase : str
        Either 's', 'l', 'g', or None if the phase cannot be determined

    Notes
    -----
    No special attential is paid to any phase transition. For the case where 
    the melting point is not provided, the possibility of the fluid being solid
    is simply ignored.

    Examples
    --------
    >>> identify_phase(T=280, P=101325, Tm=273.15, Psat=991)
    'l'
    '''
    if Tm and T <= Tm:
        return 's'
    elif Tc and T >= Tc:
        # No special return value for the critical point
        return 'g'
    elif Psat:
        # Do not allow co-existence of phases; transition to 'l' directly under 
        if P <= Psat:
            return 'g'
        elif P > Psat:
            return 'l'
    elif Tb:
        # Crude attempt to model phases without Psat
        # Treat Tb as holding from 90 kPa to 110 kPa
        if 9E4 < P < 1.1E5:
            if T < Tb:
                return  'l'
            else:
                return 'g'
        elif P > 1.1E5 and T <= Tb:
            # For the higher-pressure case, it is definitely liquid if under Tb
            # Above the normal boiling point, impossible to say - return None 
            return 'l'
        else:
            return None
    else:
        return None


mixture_phase_methods = ['IDEAL_VLE', 'SUPERCRITICAL_T', 'SUPERCRITICAL_P', 'IDEAL_VLE_SUPERCRITICAL']

def identify_phase_mixture(T=None, P=None, zs=None, Tcs=None, Pcs=None,
                           Psats=None, CASRNs=None,
                           AvailableMethods=False, Method=None):  # pragma: no cover
    '''
    >>> identify_phase_mixture(T=280, P=5000., zs=[0.5, 0.5], Psats=[1400, 7000])
    ('l', [0.5, 0.5], None, 0)
    >>> identify_phase_mixture(T=280, P=3000., zs=[0.5, 0.5], Psats=[1400, 7000])
    ('two-phase', [0.7142857142857143, 0.2857142857142857], [0.33333333333333337, 0.66666666666666663], 0.5625)
    >>> identify_phase_mixture(T=280, P=800., zs=[0.5, 0.5], Psats=[1400, 7000])
    ('g', None, [0.5, 0.5], 1)
    >>> identify_phase_mixture(T=280, P=800., zs=[0.5, 0.5])
    (None, None, None, None)
    '''
    def list_methods():
        methods = []
        if none_and_length_check((Psats, zs)):
            methods.append('IDEAL_VLE')
        if none_and_length_check([Tcs]) and all([T >= i for i in Tcs]):
            methods.append('SUPERCRITICAL_T')
        if none_and_length_check([Pcs]) and all([P >= i for i in Pcs]):
            methods.append('SUPERCRITICAL_P')
        if none_and_length_check([zs, Tcs]) and any([T > Tc for Tc in Tcs]):
            methods.append('IDEAL_VLE_SUPERCRITICAL')
        methods.append('NONE')
        return methods
    if AvailableMethods:
        return list_methods()
    if not Method:
        Method = list_methods()[0]
    # This is the calculate, given the method section
    xs, ys, phase, V_over_F = None, None, None, None
    if Method == 'IDEAL_VLE':
        Pdew = dew_at_T(zs, Psats)
        Pbubble = bubble_at_T(zs, Psats)
        if P >= Pbubble:
            phase = 'l'
            ys = None
            xs = zs
            V_over_F = 0
        elif P <= Pdew:
            phase = 'g'
            ys = zs
            xs = None
            V_over_F = 1
        elif Pdew < P < Pbubble:
            xs, ys, V_over_F = flash(P, zs, Psats)
            phase = 'two-phase'
    elif Method == 'SUPERCRITICAL_T':
        if all([T >= i for i in Tcs]):
            phase = 'g'
        else: # The following is nonsensical
            phase = 'two-phase'
    elif Method == 'SUPERCRITICAL_P':
        if all([P >= i for i in Pcs]):
            phase = 'g'
        else: # The following is nonsensical
            phase = 'two-phase'
    elif Method == 'IDEAL_VLE_SUPERCRITICAL':
        Psats = list(Psats)
        for i in range(len(Psats)):
            if not Psats[i] and Tcs[i] and Tcs[i] <= T:
                Psats[i] = 1E8
        Pdew = dew_at_T(zs, Psats)
        Pbubble = 1E99
        if P >= Pbubble:
            phase = 'l'
            ys = None
            xs = zs
            V_over_F = 0
        elif P <= Pdew:
            phase = 'g'
            ys = zs
            xs = None
            V_over_F = 1
        elif Pdew < P < Pbubble:
            xs, ys, V_over_F = flash(P, zs, Psats)
            phase = 'two-phase'

    elif Method == 'NONE':
        pass
    else:
        raise Exception('Failure in in function')
    return phase, xs, ys, V_over_F


def Pbubble_mixture(T=None, zs=None, Psats=None, CASRNs=None,
                   AvailableMethods=False, Method=None):  # pragma: no cover
    '''
    >>> Pbubble_mixture(zs=[0.5, 0.5], Psats=[1400, 7000])
    4200.0
    '''
    def list_methods():
        methods = []
        if none_and_length_check((Psats, zs)):
            methods.append('IDEAL_VLE')
        methods.append('NONE')
        return methods
    if AvailableMethods:
        return list_methods()
    if not Method:
        Method = list_methods()[0]
    # This is the calculate, given the method section
    if Method == 'IDEAL_VLE':
        Pbubble = bubble_at_T(zs, Psats)
    elif Method == 'NONE':
        Pbubble = None
    else:
        raise Exception('Failure in in function')
    return Pbubble


def Pdew_mixture(T=None, zs=None, Psats=None, CASRNs=None,
                 AvailableMethods=False, Method=None):  # pragma: no cover
    '''
    >>> Pdew_mixture(zs=[0.5, 0.5], Psats=[1400, 7000])
    2333.3333333333335
    '''
    def list_methods():
        methods = []
        if none_and_length_check((Psats, zs)):
            methods.append('IDEAL_VLE')
        methods.append('NONE')
        return methods
    if AvailableMethods:
        return list_methods()
    if not Method:
        Method = list_methods()[0]
    # This is the calculate, given the method section
    if Method == 'IDEAL_VLE':
        Pdew = dew_at_T(zs, Psats)
    elif Method == 'NONE':
        Pdew = None
    else:
        raise Exception('Failure in in function')
    return Pdew



