class User < ActiveRecord::Base

  validates :session_token, :full_name, :password_digest, :email, presence: true
  validates :email, uniqueness: true
  validates :password, length: {minimum: 6}, allow_nil: true

  attr_reader :password

  after_initialize :ensure_session_token

  def self.find_by_credentials(email, password)
    user = self.find_by_email(email)

    if user && user.is_password?(password)
      user
    else
      nil
    end
  end

  def ensure_session_token
    self.session_token ||= new_session_token
  end

  def password=(password)
    self.password_digest = BCrypt::Password.create(password)
    @password = password
  end

  def is_password?(password)
    BCrypt::Password.new(self.password_digest).is_password?(password)
  end

  def reset_session_token!
    self.session_token = new_session_token
    ensure_session_token_uniqueness
    self.save
    self.session_token
  end

  def new_session_token
    SecureRandom.base64
  end

  def ensure_session_token_uniqueness
    while User.find_by(session_token: self.session_token)
      self.session_token = new_session_token
    end
  end

end
