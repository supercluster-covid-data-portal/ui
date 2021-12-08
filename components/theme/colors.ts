/*
 *
 * Copyright (c) 2021 The Ontario Institute for Cancer Research. All rights reserved
 *
 *  This program and the accompanying materials are made available under the terms of
 *  the GNU Affero General Public License v3.0. You should have received a copy of the
 *  GNU Affero General Public License along with this program.
 *   If not, see <http://www.gnu.org/licenses/>.
 *
 *  THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY
 *  EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES
 *  OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT
 *  SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT,
 *  INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED
 *  TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS;
 *  OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER
 *  IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN
 *  ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 *
 */

const base = {
  white: '#fff',
  black: '#13131E',
  pure_black: '#000',
};

const grey = {
  grey_100: '#FBFBFC',
  grey_200: '#F9F9FA',
  grey_300: '#E9EBEF',
  grey_400: '#E1E5EE',
  grey_500: '#C8CEDB',
  grey_600: '#969DAC',
  grey_700: '#6B7483',
  grey_800: '#525965',
  grey_900: '#3A3F48',
};

const primary = {
  primary: base.black,
  primary_dark: base.pure_black,
  primary_light: grey.grey_900,
};

// blues
const accent = {
  accent: '#0089F6',
  accent_dark: '#0C74D4',
  accent_light: '#1095FF',
};

const error = {
  error: '#c86370',
  error_dark: '#ad404e',
  error_1: '#f9eff0',
  error_2: '#e9c1c6',
};

const success = {
  success: '#00ddbe',
  success_dark: '#00c4a7',
};

const warning = {
  warning: '#f2d021',
  warning_dark: '#e6c104',
};

export default {
  ...base,
  ...grey,
  ...accent,
  ...primary,
  ...error,
  ...success,
  ...warning,
};
