# pearpass-utils-password-generator

An utility package for generating secure passwords and passphrases.

## Table of Contents
- [Features](#features)
- [Security Notice](#security-notice)
- [Installation](#installation)
- [Usage](#usage)
- [Examples](#examples)
- [Dependencies](#dependencies)
- [Related Projects](#related-projects)

## Features

- Generate secure passwords with customizable options
    - Configurable length
    - Include/exclude special characters
    - Include/exclude lowercase letters
    - Include/exclude uppercase letters
    - Include/exclude numbers
- Generate memorable passphrases with configurable settings
    - Adjustable word count
    - Optional capitalization
    - Optional number suffixes
    - Optional symbol suffixes

## Security Notice

1. To ensure the security and integrity of your projects, please note that official PearPass packages are distributed exclusively through our GitHub organization.
2. Any packages with similar names found on the npm registry or other third-party package managers are not affiliated with PearPass and should be strictly avoided. We recommend installing directly from this repository to ensure you are using the verified, open-source version.

## Installation

```bash
npm install git+https://github.com/tetherto/pearpass-utils-password-generator.git
```

## Usage Examples
```javascript
import { generatePassword, generatePassphrase } from '@tetherto/pearpass-utils-password-generator';

// Generate a password
const password = generatePassword(12, {
    includeSpecialChars: true,
    lowerCase: true,
    upperCase: true,
    numbers: true
});

// Generate a passphrase
const passphrase = generatePassphrase(true, true, true, 4);
```

### Password Generation
```javascript
// Generate a 16-character password with all character types
const strongPassword = generatePassword(16);

// Generate a 12-character password without special characters
const simplePassword = generatePassword(12, { includeSpecialChars: false });

// Generate a numeric PIN
const pin = generatePassword(6, {
    includeSpecialChars: false,
    lowerCase: false,
    upperCase: false,
    numbers: true
});
```

### Passphrase Generation
```javascript
// Generate a 4-word passphrase with capitalization, symbols, and numbers
const complexPassphrase = generatePassphrase(true, true, true, 4);
// Example: "Guitar5$ Elephant3# Balloon7^ Dog2&"

// Generate a simple 3-word passphrase
const simplePassphrase = generatePassphrase(false, false, false, 3);
// Example: "river camera piano"
```

## Dependencies

This package has no production dependencies.

## Related Projects

- [@tetherto/pearpass-app-mobile](https://github.com/tetherto/pearpass-app-mobile) - A mobile app for PearPass, a password manager
- [@tetherto/pearpass-app-desktop](https://github.com/tetherto/pearpass-app-desktop) - A desktop app for PearPass, a password
- [@tetherto/pearpass-lib-ui-react-native-components](https://github.com/tetherto/pearpass-lib-ui-react-native-components) - A library of React Native UI components for PearPass
- [@tetherto/pearpass-lib-ui-react-components](https://github.com/tetherto/pearpass-lib-ui-react-components) - A library of React UI components for PearPass
- [@tetherto/tether-dev-docs](https://github.com/tetherto/tether-dev-docs) - Documentations and guides for developers

## License

This project is licensed under the Apache License, Version 2.0. See the [LICENSE](./LICENSE) file for details.